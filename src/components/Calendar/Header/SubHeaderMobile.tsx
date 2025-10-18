import { CalendarSelectMobile, SearchInput } from '@/components';
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import styles from './Header.module.sass';
import { useCalendarContext } from '@/hooks';

type SubHeaderMobileProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddEvent: () => void;
  onManageCalendar?: () => void;
};

export const SubHeaderMobile = ({
  searchValue,
  onSearchChange,
  onAddEvent,
  onManageCalendar,
}: SubHeaderMobileProps) => {
  const { selectedCalendar, setSelectedCalendar } = useCalendarContext();

  return (
    <div className={styles.calendarSubHeader}>
      <div className={styles.calendarHeaderLeft}>
        <SearchInput
          key="search-input"
          className={styles.searchInput}
          placeholder="Search events..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <div className={styles.calendarHeaderRight}>
        <CalendarSelectMobile
          value={selectedCalendar}
          onChange={setSelectedCalendar}
          onManageCalendar={onManageCalendar}
        />
        <ActionIcon
          key="add-button"
          variant="filled"
          size="xl"
          radius="xl"
          aria-label="Add Event"
          title="Add Event"
          onClick={onAddEvent}
        >
          <IconPlus size={24} />
        </ActionIcon>
      </div>
    </div>
  );
};
