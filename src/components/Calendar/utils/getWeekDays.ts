import { eachDayOfInterval, endOfWeek, startOfWeek } from '@/utils/dayjs';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';

type GetWeekDaysOptions = {
  date: Date;
};

export const getWeekDays = ({ date }: GetWeekDaysOptions): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });
  const end = endOfWeek(date, { weekStartsOn: FIRST_DAY_OF_WEEK_DEFAULT });
  return eachDayOfInterval({ start, end });
};
