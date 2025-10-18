import { useMemo } from 'react';
import { ScrollArea } from '@mantine/core';
import styles from './DayView.module.sass';
import type { CalendarEventType } from '@/types';
import { AllDayEvents } from '../AllDayEvent';
import { useScrollToCurrentHour } from '@/hooks';
import { renderTimeSlot } from '../utils';

type CalendarDayViewProps = {
  date: Date;
  events: CalendarEventType[];
  onEventClick: (event: CalendarEventType) => void;
};

export const CalendarDayView = ({ date, events, onEventClick }: CalendarDayViewProps) => {
  const { viewportRef } = useScrollToCurrentHour({ date });

  // Memoized precomputations: sort, split, sweep-line grouping, group/layout maps, hour buckets, time slots
  const { allDayEvents, timeSlots } = useMemo(() => {
    // Sort once by start time
    const sorted = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const allDay: CalendarEventType[] = [];
    const timed: CalendarEventType[] = [];
    sorted.forEach((ev) => (ev.isAllDay ? allDay.push(ev) : timed.push(ev)));

    // Sweep-line grouping: consecutive overlapping events form a group
    const groups: CalendarEventType[][] = [];
    let currentGroup: CalendarEventType[] = [];
    let currentMaxEnd = 0;

    timed.forEach((ev) => {
      const startMs = new Date(ev.startDate).getTime();
      const endMs = new Date(ev.endDate).getTime();
      if (currentGroup.length === 0) {
        currentGroup.push(ev);
        currentMaxEnd = endMs;
        return;
      }
      if (startMs < currentMaxEnd) {
        currentGroup.push(ev);
        if (endMs > currentMaxEnd) currentMaxEnd = endMs;
        return;
      }
      groups.push(currentGroup);
      currentGroup = [ev];
      currentMaxEnd = endMs;
    });
    if (currentGroup.length > 0) groups.push(currentGroup);

    // Map event -> its group
    const idToGroup = new Map<string, CalendarEventType[]>();
    groups.forEach((group) => {
      group.forEach((ev) => idToGroup.set(ev.id, group));
    });

    // Bucket timed events by each hour they span
    const byHour: Record<number, CalendarEventType[]> = {};
    for (let h = 0; h < 24; h += 1) byHour[h] = [];
    timed.forEach((ev) => {
      const startHour = new Date(ev.startDate).getHours();
      const endHour = new Date(ev.endDate).getHours();
      for (let h = startHour; h <= endHour; h += 1) byHour[h].push(ev);
    });

    // Precompute time slots for the day
    const slots = Array.from(
      { length: 24 },
      (_, i) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0)
    );

    return {
      allDayEvents: allDay,
      timeEvents: timed,
      eventGroupMap: idToGroup,
      eventsByHour: byHour,
      timeSlots: slots,
    };
  }, [events, date]);

  const renderSlot = (timeSlot: Date) =>
    renderTimeSlot({
      timeSlot,
      events,
      onEventClick,
    });

  return (
    <div className={styles.dayView}>
      <AllDayEvents events={allDayEvents} onEventClick={onEventClick} />

      <ScrollArea className={styles.timelineView} viewportRef={viewportRef}>
        {timeSlots.map(renderSlot)}
      </ScrollArea>
    </div>
  );
};
