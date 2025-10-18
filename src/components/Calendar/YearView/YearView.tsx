import { useMemo } from 'react';
import { ScrollArea } from '@mantine/core';
import { eachDayOfInterval, eachMonthOfInterval, endOfYear, startOfYear } from '@/utils/dayjs';
import type { CalendarEventType } from '@/types/calendar.type';
import { MonthTile } from './MonthTile/MonthTile';
import styles from './YearView.module.sass';

type CalendarYearViewProps = {
  date: Date;
  events: CalendarEventType[];
  selectedDate: Date;
  onMonthSelect: (date: Date) => void;
};

export const CalendarYearView = ({
  date,
  events,
  selectedDate: _selectedDate,
  onMonthSelect,
}: CalendarYearViewProps) => {
  const yearStart = useMemo(() => startOfYear(date), [date]);
  const yearEnd = useMemo(() => endOfYear(date), [date]);

  const months = useMemo(() => {
    return eachMonthOfInterval({ start: yearStart, end: yearEnd });
  }, [yearStart, yearEnd]);

  // Pre-index all events across the visible year by month and day to avoid recomputing per tile
  const eventsByMonthDay = useMemo(() => {
    const map = new Map<number, Map<number, CalendarEventType[]>>();
    if (!events || events.length === 0) return map;

    for (const event of events) {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);

      // Clamp to the current year interval
      const rangeStart = eventStart < yearStart ? yearStart : eventStart;
      const rangeEnd = eventEnd > yearEnd ? yearEnd : eventEnd;
      if (rangeEnd < yearStart || rangeStart > yearEnd) continue;

      const daysInRange = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
      for (const day of daysInRange) {
        const monthKey = new Date(day.getFullYear(), day.getMonth(), 1).getTime();
        const dayKey = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        let daysMap = map.get(monthKey);
        if (!daysMap) {
          daysMap = new Map<number, CalendarEventType[]>();
          map.set(monthKey, daysMap);
        }
        const list = daysMap.get(dayKey) ?? [];
        list.push(event);
        daysMap.set(dayKey, list);
      }
    }

    return map;
  }, [events, yearStart, yearEnd]);

  return (
    <>
      <ScrollArea className={styles.yearView}>
        <div className={styles.yearViewGrid}>
          {months.map((month) => {
            const monthKey = new Date(month.getFullYear(), month.getMonth(), 1).getTime();
            const eventsByDay = eventsByMonthDay.get(monthKey) ?? new Map<number, CalendarEventType[]>();
            return <MonthTile key={monthKey} month={month} onMonthSelect={onMonthSelect} eventsByDay={eventsByDay} />;
          })}
        </div>
      </ScrollArea>
    </>
  );
};
