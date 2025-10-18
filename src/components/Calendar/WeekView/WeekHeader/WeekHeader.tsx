import { Grid, Text } from '@mantine/core';
import classNames from 'classnames';
import { memo } from 'react';
import { format, isToday } from '@/utils/dayjs';
import { CALENDAR_TITLE_DATE_SHORT_FORMAT, CALENDAR_TITLE_DAY_SHORT_FORMAT } from '@/constants/date';
import styles from './WeekHeader.module.sass';
import weekViewStyles from '../WeekView.module.sass';

type WeekHeaderProps = {
  weekDays: Date[];
};

const WeekHeaderComponent = ({ weekDays }: WeekHeaderProps) => {
  return (
    <Grid gutter={0} columns={8} className={weekViewStyles.row}>
      <Grid.Col span={1} className={weekViewStyles.firstCol} />
      {weekDays.map((day) => (
        <Grid.Col key={day.getTime()} span={1} className={weekViewStyles.dayCol}>
          <div
            className={classNames(styles.dayColInner, {
              [styles.active]: isToday(day),
            })}
          >
            <Text size="xs" className={styles.dayHeaderText}>
              {format(day, CALENDAR_TITLE_DAY_SHORT_FORMAT)}
            </Text>
            <Text
              className={classNames(styles.dateHeaderText, {
                [styles.isToday]: isToday(day),
              })}
              size="xs"
            >
              {format(day, CALENDAR_TITLE_DATE_SHORT_FORMAT)}
            </Text>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export const WeekHeader = memo(WeekHeaderComponent);
