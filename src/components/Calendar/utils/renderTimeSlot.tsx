import { TimeSlotBadge } from '@/components/Calendar/TimeSlotBadge/TimeSlotBadge';
import dayStyles from '@/components/Calendar/DayView/DayView.module.sass';
import type { CalendarEventType } from '@/types';
import { isSameDay } from '@/utils/dayjs';
import { Event } from '@/components/Calendar';

type RenderTimeSlotArgs = {
  timeSlot: Date;
  events: CalendarEventType[];
  onEventClick: (event: CalendarEventType) => void;
  showBadge?: boolean;
  leftGutterWidthPx?: number;
};

export const renderTimeSlot = ({
  timeSlot,
  events,
  onEventClick,
  showBadge = true,
  leftGutterWidthPx = 60,
}: RenderTimeSlotArgs) => {
  const day = new Date(timeSlot.getFullYear(), timeSlot.getMonth(), timeSlot.getDate());
  const currentHour = timeSlot.getHours();

  // Filter events to the same day and non all-day, sorted by start
  const dayTimedEvents = events
    .filter((ev) => !ev.isAllDay && (isSameDay(ev.startDate, day) || isSameDay(ev.endDate, day)))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // Group overlapping events (sweep-line)
  const groups: CalendarEventType[][] = [];
  let currentGroup: CalendarEventType[] = [];
  let currentMaxEnd = 0;
  dayTimedEvents.forEach((ev) => {
    const startMs = new Date(ev.startDate).getTime();
    const endMs = new Date(ev.endDate).getTime();
    if (currentGroup.length === 0 || startMs < currentMaxEnd) {
      currentGroup.push(ev);
      if (endMs > currentMaxEnd) currentMaxEnd = endMs;
      return;
    }
    groups.push(currentGroup);
    currentGroup = [ev];
    currentMaxEnd = endMs;
  });
  if (currentGroup.length > 0) groups.push(currentGroup);

  // Select groups that have at least one event starting in this hour
  const groupsInHour = groups.filter((group) => group.some((ev) => new Date(ev.startDate).getHours() === currentHour));

  return (
    <div key={timeSlot.getTime()} className={dayStyles.timeSlot}>
      {showBadge && <TimeSlotBadge timeSlot={timeSlot} />}
      {groupsInHour.map((group) =>
        group
          .filter((ev) => new Date(ev.startDate).getHours() === currentHour)
          .map((ev) => (
            <Event
              key={ev.id}
              event={ev}
              group={group}
              onEventClick={onEventClick}
              leftGutterWidthPx={leftGutterWidthPx}
            />
          ))
      )}
    </div>
  );
};
