import styles from './Header.module.sass';
import { CalendarSelect } from '@/components';
import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useCalendarContext } from '@/providers';

export const SubHeaderDesktop = ({
  onAddEvent,
  onManageCalendar,
}: {
  onAddEvent: () => void;
  onManageCalendar?: () => void;
}) => {
  const { selectedCalendar, setSelectedCalendar } = useCalendarContext();

  return (
    <div className={styles.calendarSubHeader}>
      <div className={styles.calendarHeaderLeft}>
        <CalendarSelect
          placeholder="Select Calendar"
          radius="xl"
          color="brand"
          buttonProps={{ size: 'md' }}
          value={selectedCalendar}
          onChange={setSelectedCalendar}
          onManageCalendar={onManageCalendar}
          width="max-content"
        />
      </div>
      <div className={styles.calendarHeaderRight}>
        <Button leftSection={<IconPlus size={16} />} onClick={onAddEvent} variant="filled">
          New Event
        </Button>
      </div>
    </div>
  );
};
