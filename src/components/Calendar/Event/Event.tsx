import { Card, Text } from '@mantine/core';
import classNames from 'classnames';
import type { CalendarEventType } from '@/types';
import styles from './Event.module.sass';
import { format } from '@/utils/dayjs';
import { CALENDAR_EVENT_DATE_FORMAT } from '@/constants';

type EventProps = {
  event: CalendarEventType;
  group: CalendarEventType[];
  onEventClick?: (event: CalendarEventType) => void;
  onEventDelete?: (event: CalendarEventType) => void;
  leftGutterWidthPx?: number;
};

export const Event = ({ event, group, leftGutterWidthPx = 60, onEventClick }: EventProps) => {
  const eventIndex = group.findIndex((e) => e.id === event.id);

  // Calculate height based on duration (60px per hour)
  const durationMs = new Date(event.endDate).getTime() - new Date(event.startDate).getTime();
  const durationMinutes = durationMs / (1000 * 60);
  const isShortEvent = durationMinutes <= 45;
  const height = Math.max(24, (durationMinutes / 60) * 60); // Minimum 24px for usability

  // Calculate vertical offset within the hour based on start minutes
  const startMinutes = new Date(event.startDate).getMinutes();
  const topOffset = (startMinutes / 60) * 60; // 60px per hour slot

  const contentWidthExpr = `calc(100% - ${leftGutterWidthPx}px - 8px)`;
  const eventWidth = group.length > 1 ? `calc(${contentWidthExpr} / ${group.length} - 2px)` : contentWidthExpr;
  const leftOffset =
    group.length > 1
      ? `calc(${leftGutterWidthPx}px + ${eventIndex} * (${contentWidthExpr}) / ${group.length})`
      : `${leftGutterWidthPx}px`;

  let eventTimeTitle = `${format(event.startDate, CALENDAR_EVENT_DATE_FORMAT)} - ${format(event.endDate, CALENDAR_EVENT_DATE_FORMAT)}`;

  if (isShortEvent) {
    eventTimeTitle = `${format(event.startDate, CALENDAR_EVENT_DATE_FORMAT)}`;
  }

  return (
    <Card
      p="xs"
      style={{
        left: leftOffset,
        width: eventWidth,
        height: `${height}px`,
        top: `${topOffset}px`,
        backgroundColor: event.color,
        color: event.textColor,
      }}
      className={classNames(styles.event, { [styles.shortEvent]: isShortEvent })}
      onClick={() => onEventClick?.(event)}
    >
      <Text size="xs" className={styles.eventTime}>
        {eventTimeTitle}
      </Text>
      <Text size="xs" className={styles.eventTitle}>
        {event.title}
      </Text>
    </Card>
  );
};
