import { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Badge, ScrollArea } from '@mantine/core';
import { IconChevronCompactDown } from '@tabler/icons-react';
import { format, isToday } from '@/utils/dayjs';
import type { CalendarEventType } from '@/types';
import styles from './DayCell.module.sass';
import { CALENDAR_DAY_CELL_FORMAT } from '@/constants';
import { EventCard } from '../Event/EventCard';

type DayCellProps = {
  day: Date;
  date: Date;
  events: CalendarEventType[];
  onEventClick: (event: CalendarEventType) => void;
};

const DayCellComponent = ({ day, date, events, onEventClick }: DayCellProps) => {
  const isTodayDay = isToday(day);
  const isCurrentMonth = day.getMonth() === date.getMonth() && day.getFullYear() === date.getFullYear();

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      if (a.isAllDay && !b.isAllDay) return -1;
      if (!a.isAllDay && b.isAllDay) return 1;
      if (a.isAllDay && b.isAllDay) return 0;
      const aTime = new Date(a.startTime || a.startDate).getTime();
      const bTime = new Date(b.startTime || b.startDate).getTime();
      return aTime - bTime;
    });
  }, [events]);

  return (
    <div className={styles.dayCell}>
      <Badge
        className={classNames(styles.dayCellBadge, {
          [styles.isNotCurrentMonth]: !isCurrentMonth,
        })}
        variant={isTodayDay ? 'filled' : 'transparent'}
        color={isTodayDay ? 'brand' : 'base'}
      >
        {format(day, CALENDAR_DAY_CELL_FORMAT)}
      </Badge>
      <ScrollArea className={styles.dayCellEvents}>
        <div className={styles.dayCellEventsContainer}>
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} onEventClick={onEventClick} />
          ))}
        </div>
      </ScrollArea>
      {events.length > 3 && (
        <div className={styles.dayCellMore}>
          <IconChevronCompactDown size={16} className={styles.dayCellMoreIcon} />
        </div>
      )}
    </div>
  );
};

export const DayCell = memo(DayCellComponent);
