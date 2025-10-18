import classNames from 'classnames';
import { Badge } from '@mantine/core';
import { format, isSameDay, startOfWeek } from '@/utils/dayjs';
import { useCalendarContext } from '@/providers';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import { CALENDAR_VIEW } from '@/types';
import styles from './TimeSlotBadge.module.sass';

type TimeSlotBadgeProps = {
  timeSlot: number | Date;
};

export const TimeSlotBadge = ({ timeSlot }: TimeSlotBadgeProps) => {
  const hour = typeof timeSlot === 'number' ? timeSlot : timeSlot.getHours();
  const referenceDate = new Date();
  referenceDate.setHours(hour, 0, 0, 0);

  const isCurrentHour = new Date().getHours() === hour;
  const { currentView, selectedDate } = useCalendarContext();
  const today = new Date();
  const isCurrentDay = isSameDay(selectedDate, today);
  const isCurrentWeek = isSameDay(
    startOfWeek(selectedDate, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT }),
    startOfWeek(today, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT })
  );
  const isFilled =
    isCurrentHour &&
    ((currentView === CALENDAR_VIEW.DAY && isCurrentDay) || (currentView === CALENDAR_VIEW.WEEK && isCurrentWeek));

  return (
    <Badge
      className={classNames(styles.timeSlotText, { [styles.isCurrentHour]: isFilled })}
      variant={isFilled ? 'filled' : 'transparent'}
      color={isFilled ? 'brand' : 'base'}
    >
      {format(referenceDate, 'ha')}
    </Badge>
  );
};
