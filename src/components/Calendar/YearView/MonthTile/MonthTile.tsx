import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { Indicator, Popover, Text } from '@mantine/core';
import * as MantineDates from '@mantine/dates';
import { format, isToday } from '@/utils/dayjs';
import styles from './MonthTile.module.sass';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import type { CalendarEventType } from '@/types';
import { CALENDAR_MONTH_EVENT_TIME_FORMAT, CALENDAR_YEAR_MONTH_NAME_FORMAT, FORMAT_DATE } from '@/constants';

type MonthTileProps = {
  month: Date;
  onMonthSelect: (date: Date) => void;
  eventsByDay?: Map<number, CalendarEventType[]>;
};

const today = new Date();

const Component = ({ month, onMonthSelect, eventsByDay }: MonthTileProps) => {
  const isCurrentMonth = today.getMonth() === month.getMonth() && today.getFullYear() === month.getFullYear();
  const [openedDayKey, setOpenedDayKey] = useState<number | null>(null);

  return (
    <div className={styles.monthTile}>
      <Text className={styles.monthTitle} onClick={() => onMonthSelect(month)}>
        {format(month, CALENDAR_YEAR_MONTH_NAME_FORMAT)}
      </Text>
      <div>
        <MantineDates.Calendar
          defaultDate={month}
          minLevel="month"
          maxLevel="month"
          numberOfColumns={1}
          classNames={{ calendarHeader: styles.calendarHeader }}
          firstDayOfWeek={FIRST_DAY_OF_WEEK_DEFAULT}
          getDayProps={(dateValue) => {
            const date = typeof dateValue === 'string' ? new Date(dateValue) : (dateValue as Date);
            const shouldHighlightToday = isCurrentMonth && isToday(date);
            const dayKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            const hasEvents = Boolean(eventsByDay?.get(dayKey)?.length);
            return {
              className: classNames(shouldHighlightToday ? styles.today : styles.day, {
                [styles.hasEvents]: hasEvents,
              }),
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                if (!hasEvents) return;
                setOpenedDayKey(dayKey);
              },
              'aria-label': hasEvents
                ? `Open events for ${format(date, FORMAT_DATE)}`
                : `No events on ${format(date, FORMAT_DATE)}`,
            };
          }}
          renderDay={(dateValue) => {
            const date = typeof dateValue === 'string' ? new Date(dateValue) : (dateValue as Date);
            const dayKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            const hasEvents = Boolean(eventsByDay?.get(dayKey)?.length);
            const dayEvents = eventsByDay?.get(dayKey) ?? [];
            return (
              <Popover
                opened={openedDayKey === dayKey}
                onChange={(opened) => {
                  if (!opened) setOpenedDayKey(null);
                }}
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hasEvents) return;
                      setOpenedDayKey(dayKey);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-label={hasEvents ? `Open events for ${format(date, FORMAT_DATE)}` : undefined}
                  >
                    <Indicator disabled={!hasEvents} color="red" size={6} offset={-1} withBorder={false}>
                      <span>{date.getDate()}</span>
                    </Indicator>
                  </span>
                </Popover.Target>
                <Popover.Dropdown>
                  <div className={styles.eventsList}>
                    {dayEvents.map((ev) => (
                      <div key={ev.id} className={styles.eventItem}>
                        <div className={styles.eventDot} style={{ backgroundColor: ev.calendarColor }} />
                        <div className={styles.eventText}>{ev.title}</div>
                        <div className={styles.eventTime}>
                          {ev.isAllDay
                            ? 'All Day'
                            : `${format(ev.startDate, CALENDAR_MONTH_EVENT_TIME_FORMAT)} - ${format(ev.endDate, CALENDAR_MONTH_EVENT_TIME_FORMAT)}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Dropdown>
              </Popover>
            );
          }}
          size="xs"
        />
        {openedDayKey !== null && (
          <div className={styles.screenReaderOnly} aria-live="polite">
            {format(new Date(openedDayKey), FORMAT_DATE)} events opened
          </div>
        )}
      </div>
    </div>
  );
};
export const MonthTile = memo(Component, (prev, next) => {
  const sameMonth =
    prev.month.getFullYear() === next.month.getFullYear() && prev.month.getMonth() === next.month.getMonth();
  const sameHandler = prev.onMonthSelect === next.onMonthSelect;
  const sameEventsMap = prev.eventsByDay === next.eventsByDay;
  return sameMonth && sameHandler && sameEventsMap;
});

export default MonthTile;
