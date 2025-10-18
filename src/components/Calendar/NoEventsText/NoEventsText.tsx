import { Text } from '@mantine/core';
import { IconCalendarOff } from '@tabler/icons-react';
import styles from './NoEventsText.module.sass';

export const NoEventsText = () => {
  return (
    <Text c="dimmed" className={styles.noEventsText}>
      <IconCalendarOff size={24} />
      No events
    </Text>
  );
};
