import { Group, Text, UnstyledButton } from '@mantine/core';
import { ColoredSection, FormattedTime } from '@/components';
import { IconClock, IconLocation, IconRepeat } from '@tabler/icons-react';
import type { CalendarEventType } from '@/types';
import styles from './EventCard.module.sass';

type EventCardProps = {
  event: CalendarEventType;
  onEventClick?: (event: CalendarEventType) => void;
};

export const EventCard = ({ event, onEventClick }: EventCardProps) => {
  return (
    <UnstyledButton
      key={event.id}
      className={styles.eventItem}
      onClick={() => onEventClick && onEventClick(event)}
      aria-label={`Open event ${event.title}`}
    >
      <ColoredSection color={event.calendarColor} size="sm">
        <Text className={styles.eventTitle}>
          {event.eventRecurrence?.frequency && <IconRepeat size={20} color="var(--mantine-color-brand-5)" />}
          {event.title}
        </Text>
        <Group gap={0.5}>
          <IconClock size={16} />
          <FormattedTime startDate={event.startDate} endDate={event.endDate} />
        </Group>
        {event.location && (
          <Group gap={0.5}>
            <IconLocation size={16} />
            <Text>{event.location}</Text>
          </Group>
        )}
      </ColoredSection>
    </UnstyledButton>
  );
};
