import { Grid, Text } from '@mantine/core';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from '@/utils/dayjs';
import styles from './Header.module.sass';
import { CALENDAR_TITLE_MONTH_DAY_FORMAT } from '@/constants/date';

const weekDays = (() => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart, { weekStartsOn: 0 }) });
  return days.map((day) => format(day, CALENDAR_TITLE_MONTH_DAY_FORMAT));
})();

export const Header = () => {
  return (
    <Grid gutter={0} className={styles.headerGrid}>
      {weekDays.map((day) => (
        <Grid.Col key={day} span={12 / 7} className={styles.dayHeaderCol}>
          <Text className={styles.dayHeaderText} size="xs">
            {day}
          </Text>
        </Grid.Col>
      ))}
    </Grid>
  );
};
