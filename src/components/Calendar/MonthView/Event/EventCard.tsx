import React from 'react';
import { Card, Text } from '@mantine/core';
import { IconCalendarMonth } from '@tabler/icons-react';
import classNames from 'classnames';
import { format } from '@/utils/dayjs';
import { CALENDAR_MONTH_EVENT_TIME_FORMAT } from '@/constants';
import type { CalendarEventType } from '@/types';
import styles from '../DayCell/DayCell.module.sass';

type EventCardProps = {
  event: CalendarEventType;
  onEventClick: (event: CalendarEventType) => void;
};

export const EventCard = ({ event, onEventClick }: EventCardProps) => {
  const isAllDay = event.isAllDay;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick(event);
  };

  return (
    <Card
      className={classNames(styles.dayCellEvent, {
        [styles.dayCellEventAllDay]: isAllDay,
      })}
      style={{
        backgroundColor: event.color,
      }}
      onClick={handleClick}
    >
      <div className={styles.dayCellTitleContainer}>
        {isAllDay && <IconCalendarMonth size={14} className={styles.dayCellEventAllDayIcon} />}
        <Text className={styles.dayCellEventTitle} lineClamp={1} size="xs">
          {event.title}
        </Text>
        {!event.isAllDay && (
          <Text size="xs" className={styles.dayCellEventTime}>
            {format(event.startDate, CALENDAR_MONTH_EVENT_TIME_FORMAT)}
          </Text>
        )}
      </div>
    </Card>
  );
};
