import classNames from 'classnames';
import { memo, useCallback, useState } from 'react';
import { ActionIcon, Button, SegmentedControl, Title } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { CALENDAR_VIEW } from '@/types';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from '@/utils/dayjs';
import { useCalendarContext } from '@/providers';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import styles from './Header.module.sass';
import {
  CALENDAR_TITLE_DAY_FORMAT,
  CALENDAR_TITLE_MONTH_FORMAT,
  CALENDAR_TITLE_WEEK_FORMAT_END,
  CALENDAR_TITLE_WEEK_FORMAT_START,
  CALENDAR_TITLE_YEAR_FORMAT,
} from '@/constants';
import { useScreenSize } from '@/hooks';
import { SubHeaderMobile } from './SubHeaderMobile';
import { SubHeaderDesktop } from './SubHeaderDesktop';

type HeaderProps = {
  className?: string;
  onAddEvent: () => void;
  onManageCalendar?: () => void;
};

const getCurrentViewTitle = (date: Date, view: CALENDAR_VIEW, weekStartsOn: number) => {
  const formatMap = {
    day: format(date, CALENDAR_TITLE_DAY_FORMAT),
    week: `${format(startOfWeek(date, { weekStartsOn }), CALENDAR_TITLE_WEEK_FORMAT_START)} - ${format(endOfWeek(date, { weekStartsOn }), CALENDAR_TITLE_WEEK_FORMAT_END)}`,
    month: format(date, CALENDAR_TITLE_MONTH_FORMAT),
    year: format(date, CALENDAR_TITLE_YEAR_FORMAT),
  } as const;
  return formatMap[view];
};

export const Header = memo(({ className, onAddEvent, onManageCalendar }: HeaderProps) => {
  const { isMobile } = useScreenSize();
  const { selectedDate, setSelectedDate, currentView, setCurrentView } = useCalendarContext();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      const navigationMap = {
        day: { prev: subDays, next: addDays },
        week: { prev: subWeeks, next: addWeeks },
        month: { prev: subMonths, next: addMonths },
        year: { prev: subYears, next: addYears },
      };

      const navigator = navigationMap[currentView];
      if (navigator) {
        setSelectedDate(navigator[direction](selectedDate, 1));
      }
    },
    [currentView, selectedDate, setSelectedDate]
  );

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
  }, [setSelectedDate]);

  return (
    <div className={classNames(styles.headerContainer, className)}>
      <div className={styles.calendarHeader}>
        <div className={styles.calendarHeaderLeft}>
          <Title order={6} className={styles.calendarHeaderTitle}>
            {getCurrentViewTitle(selectedDate, isMobile ? CALENDAR_VIEW.MONTH : currentView, FIRST_DAY_OF_WEEK_DEFAULT)}
          </Title>
        </div>
        {!isMobile && (
          <div className={styles.calendarHeaderCenter}>
            <SegmentedControl
              value={currentView}
              radius="xl"
              withItemsBorders={false}
              onChange={(value) => setCurrentView(value as CALENDAR_VIEW)}
              data={[
                { value: CALENDAR_VIEW.DAY, label: 'Day' },
                { value: CALENDAR_VIEW.WEEK, label: 'Week' },
                { value: CALENDAR_VIEW.MONTH, label: 'Month' },
                { value: CALENDAR_VIEW.YEAR, label: 'Year' },
              ]}
              w={300}
            />
          </div>
        )}
        <div className={styles.calendarHeaderRight}>
          <ActionIcon
            variant="outline"
            color="gray"
            onClick={() => handleNavigate('prev')}
            size="xl"
            radius="xl"
            className={styles.navIcon}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>
          <Button variant="outline" color="gray" onClick={handleTodayClick} className={styles.todayButton}>
            Today
          </Button>
          <ActionIcon
            variant="outline"
            color="gray"
            onClick={() => handleNavigate('next')}
            size="xl"
            radius="xl"
            className={styles.navIcon}
          >
            <IconChevronRight size={16} />
          </ActionIcon>
        </div>
      </div>

      {isMobile ? (
        <SubHeaderMobile
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAddEvent={onAddEvent}
          onManageCalendar={onManageCalendar}
        />
      ) : (
        <SubHeaderDesktop onAddEvent={onAddEvent} onManageCalendar={onManageCalendar} />
      )}
    </div>
  );
});
