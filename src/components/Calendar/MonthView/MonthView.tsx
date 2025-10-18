import { useMemo, useRef } from 'react';
import { Grid, ScrollArea } from '@mantine/core';
import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from '@/utils/dayjs';
import { Header } from './Header/Header.tsx';
import { DayCell } from './DayCell/DayCell.tsx';
import type { CalendarEventType } from '@/types';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import styles from './MonthView.module.sass';

type CalendarMonthViewProps = {
  date: Date;
  events: CalendarEventType[];
  onEventClick: (event: CalendarEventType) => void;
};

export const CalendarMonthView = ({ date, events, onEventClick }: CalendarMonthViewProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const calendarWeeks = useMemo(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });

    return eachWeekOfInterval({ start: calendarStart, end: calendarEnd }, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });
  }, [date]);

  const eventsByDay = useMemo(() => {
    // Bucket events by day to avoid filtering per cell on every render
    const buckets = new Map<number, CalendarEventType[]>();
    for (const event of events) {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      const dayCursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      while (dayCursor.getTime() <= endDay.getTime()) {
        const key = dayCursor.getTime();
        const list = buckets.get(key) ?? [];
        list.push(event);
        buckets.set(key, list);
        dayCursor.setDate(dayCursor.getDate() + 1);
      }
    }
    return buckets;
  }, [events]);

  const weeksDays = useMemo(() => {
    return calendarWeeks.map((weekStart) =>
      eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT }) })
    );
  }, [calendarWeeks]);

  return (
    <div className={styles.monthViewContainer}>
      <Header />

      <ScrollArea className={styles.monthView} viewportRef={viewportRef}>
        {weeksDays.map((daysOfWeek, index) => (
          <Grid key={calendarWeeks[index].getTime()} gutter={0}>
            {daysOfWeek.map((day) => {
              const dayKey = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
              const dayEvents = eventsByDay.get(dayKey) ?? [];
              return (
                <Grid.Col key={day.getTime()} span={12 / 7}>
                  <DayCell day={day} date={date} events={dayEvents} onEventClick={onEventClick} />
                </Grid.Col>
              );
            })}
          </Grid>
        ))}
      </ScrollArea>
    </div>
  );
};
