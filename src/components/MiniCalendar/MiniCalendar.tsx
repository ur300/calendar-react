import { type ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { Box, Text, UnstyledButton } from '@mantine/core';
import { format, isToday } from '@/utils/dayjs';
import { getWeekDays } from '@/components/Calendar/utils/';
import styles from './MiniCalendar.module.sass';
import { CALENDAR_DAY_CELL_FORMAT, CALENDAR_SHORT_DAY_FORMAT } from '@/constants/date';

type MiniCalendarProps = {
  date?: Date;
  onDateSelect?: (date: Date) => void;
  renderDay?: (date: Date) => ReactNode;
};

export const MiniCalendar = ({ date = new Date(), onDateSelect, renderDay }: MiniCalendarProps) => {
  const weekDays = useMemo(() => getWeekDays({ date }), [date]);

  return (
    <Box className={styles.miniCalendar}>
      {weekDays.map((day) => (
        <UnstyledButton
          key={day.getTime()}
          className={classNames(styles.dayInner, {
            [styles.active]: isToday(day),
          })}
          onClick={() => onDateSelect?.(day)}
        >
          <Text size="md" className={styles.dayHeaderText}>
            {format(day, CALENDAR_SHORT_DAY_FORMAT)}
          </Text>
          {renderDay ? (
            renderDay(day)
          ) : (
            <Text className={styles.dateHeaderText} size="md">
              {format(day, CALENDAR_DAY_CELL_FORMAT)}
            </Text>
          )}
        </UnstyledButton>
      ))}
    </Box>
  );
};
