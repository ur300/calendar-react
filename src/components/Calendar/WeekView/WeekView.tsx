import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Box, Grid, ScrollArea, Text } from '@mantine/core';
import { eachDayOfInterval, endOfWeek, isSameDay, startOfWeek } from '@/utils/dayjs';
import { type CalendarEventType } from '@/types';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import styles from './WeekView.module.sass';
import { useScrollToCurrentHour } from '@/hooks';
import { WeekHeader } from './WeekHeader/WeekHeader';
import { renderTimeSlot } from '../utils';
import { TimeSlotBadge } from '../TimeSlotBadge/TimeSlotBadge';
import { AllDayEvents } from '../AllDayEvent';

type CalendarWeekViewProps = {
  date: Date;
  events: CalendarEventType[];
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEventType) => void;
};

export const CalendarWeekView = ({ date, events, onDateSelect, onEventClick }: CalendarWeekViewProps) => {
  const { viewportRef } = useScrollToCurrentHour({ date });
  const weekDays = useMemo(() => {
    const start = startOfWeek(date, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });
    return eachDayOfInterval({ start, end: endOfWeek(date, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT }) });
  }, [date]);

  const dayKey = useCallback((day: Date) => new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime(), []);

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEventType[]>();
    for (const day of weekDays) {
      map.set(dayKey(day), []);
    }
    for (const event of events) {
      for (const day of weekDays) {
        if (event.isAllDay) {
          if (isSameDay(event.startDate, day)) {
            map.get(dayKey(day))?.push(event);
          }
          continue;
        }
        if (isSameDay(event.startDate, day) || isSameDay(event.endDate, day)) {
          map.get(dayKey(day))?.push(event);
        }
      }
    }
    return map;
  }, [dayKey, events, weekDays]);

  const renderWeekSlot = useCallback(
    (hour: number, day: Date, dayEvents: CalendarEventType[]) =>
      renderTimeSlot({
        timeSlot: new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0, 0),
        events: dayEvents,
        onEventClick,
        showBadge: false,
        leftGutterWidthPx: 4,
      }),
    [onEventClick]
  );

  const timeSlots = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  return (
    <Box className={styles.weekView}>
      <WeekHeader weekDays={weekDays} onDateSelect={onDateSelect} />

      <Grid gutter={0} columns={8} className={styles.row}>
        <Grid.Col span={1} className={classNames(styles.firstCol, styles.allDayCol)}>
          <Text className={styles.allDayText} size="xs">
            All Day
          </Text>
        </Grid.Col>
        {weekDays.map((day) => {
          const dayEvents = eventsByDay.get(dayKey(day)) ?? [];
          const allDayEvents = dayEvents.filter((event) => event.isAllDay);
          return (
            <Grid.Col key={day.getTime()} span={1} className={styles.dayCol}>
              <AllDayEvents events={allDayEvents} showTitle={false} onEventClick={onEventClick} />
            </Grid.Col>
          );
        })}
      </Grid>

      <ScrollArea className={styles.timelineView} viewportRef={viewportRef}>
        {timeSlots.map((hour) => (
          <Grid key={hour} gutter={0} columns={8}>
            <Grid.Col span={1} className={classNames(styles.firstCol, styles.timeSlotCol)}>
              <TimeSlotBadge timeSlot={hour} />
            </Grid.Col>
            {weekDays.map((day) => {
              const dayEvents = eventsByDay.get(dayKey(day)) ?? [];
              return (
                <Grid.Col key={day.getTime()} span={1} className={classNames(styles.dayCol, styles.timeSlotCol)}>
                  {renderWeekSlot(hour, day, dayEvents)}
                </Grid.Col>
              );
            })}
          </Grid>
        ))}
      </ScrollArea>
    </Box>
  );
};
