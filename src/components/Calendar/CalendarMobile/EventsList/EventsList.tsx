import { Group, ScrollArea, Stack, Text } from '@mantine/core';
import { useEffect, useMemo, useRef } from 'react';
import dayjs, { eachDayOfInterval, endOfMonth, format, startOfMonth } from '@/utils/dayjs';
import { CALENDAR_FULL_FORMAT } from '@/constants';
import { CALENDAR_VIEW, type CalendarEventType } from '@/types';
import { getWeekDays, sortEventsByStartTime } from '@/components/Calendar/utils';
import { useCalendarContext } from '@/providers';
import { EventCard } from '@/components/Calendar/CalendarMobile/EventCard/EventCard';
import { NoEventsText } from '@/components/Calendar/NoEventsText/NoEventsText';
import styles from './EventsList.module.sass';

type EventsListProps = {
  selectedDate: Date;
  events: CalendarEventType[];
  onEventClick?: (event: CalendarEventType) => void;
};

const now = dayjs();

export const EventsList = ({ selectedDate, events, onEventClick }: EventsListProps) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLDivElement | null>(null);
  const { currentView } = useCalendarContext();

  const days = useMemo(() => {
    if (currentView === CALENDAR_VIEW.MONTH) {
      const start = startOfMonth(selectedDate);
      const end = endOfMonth(selectedDate);
      return eachDayOfInterval({ start, end });
    }
    return getWeekDays({ date: selectedDate });
  }, [currentView, selectedDate]);

  // Precompute events grouped by day ISO for the visible range
  const eventsByDay = useMemo(() => {
    const result = new Map<string, CalendarEventType[]>();
    if (events.length === 0 || days.length === 0) return result;

    // Build a lookup of day boundaries for quick overlap checks
    const dayBoundaries = days.map((day) => ({
      iso: day.toISOString(),
      start: dayjs(day).startOf('day'),
      end: dayjs(day).endOf('day'),
    }));

    for (let i = 0; i < dayBoundaries.length; i += 1) {
      const { iso, start, end } = dayBoundaries[i];
      const dayEvents = events.filter((event) => {
        const eventStart = dayjs(event.startDate);
        const eventEnd = dayjs(event.endDate);
        return eventStart.isBefore(end) && eventEnd.isAfter(start);
      });
      if (dayEvents.length > 0) {
        result.set(iso, sortEventsByStartTime(dayEvents));
      }
    }

    return result;
  }, [days, events]);

  useEffect(() => {
    if (!viewportRef.current || !todayRef.current) return;
    viewportRef.current.scrollTo({ top: todayRef.current.offsetTop, behavior: 'auto' });
  }, []);

  return (
    <ScrollArea className={styles.eventsContainer} viewportRef={viewportRef}>
      <Stack gap={12}>
        {days.map((day) => {
          const isToday = dayjs(day).isSame(now, 'day');
          const dayEvents = eventsByDay.get(day.toISOString()) ?? [];
          return (
            <div key={day.toISOString()} className={styles.eventDay} ref={isToday ? todayRef : undefined}>
              <Group gap={8}>
                <Text className={styles.eventDayHeader}>
                  {isToday ? 'Today • ' : ''} {format(day, CALENDAR_FULL_FORMAT)},
                </Text>
              </Group>
              {dayEvents.length === 0 ? (
                <NoEventsText />
              ) : (
                <Stack gap={8} className={styles.eventList}>
                  {dayEvents.map((event) => (
                    <EventCard key={event.id} event={event} onEventClick={onEventClick} />
                  ))}
                </Stack>
              )}
            </div>
          );
        })}
      </Stack>
    </ScrollArea>
  );
};
