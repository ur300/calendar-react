import { Text } from '@mantine/core';
import type { CalendarEventType } from '@/types/calendar.type';
import styles from './AllDayEvents.module.sass';

type EventBaseProps = {
  showTitle?: boolean;
  onEventClick: (event: CalendarEventType) => void;
};

type AllDayEventProps = EventBaseProps & {
  event: CalendarEventType;
};

type AllDayEventsProps = EventBaseProps & {
  events: CalendarEventType[];
};

const AllDayEvent = ({ event, showTitle = true, onEventClick }: AllDayEventProps) => {

  const handleEventClick = () => onEventClick(event);

  return (
    <div
      style={{
        backgroundColor: event.color,
        color: event.textColor,
      }}
      className={styles.event}
      onClick={handleEventClick}
    >
      <Text size="sm">{showTitle ? `| All Day | ${event.title}` : event.title}</Text>
    </div>
  );
};

export const AllDayEvents = ({ events, showTitle, onEventClick }: AllDayEventsProps) => {
  return (
    <div className={styles.allDayEvents}>
      {events.map((event) => (
        <AllDayEvent key={event.id} event={event} showTitle={showTitle} onEventClick={onEventClick} />
      ))}
    </div>
  );
};
