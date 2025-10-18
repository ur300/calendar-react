import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// Export dayjs as default
export default dayjs;

// Re-export commonly used functions with dayjs equivalents
export const format = (date: Date | string | dayjs.Dayjs, formatStr: string) => dayjs(date).format(formatStr);

export const addDays = (date: Date | string | dayjs.Dayjs, amount: number) => dayjs(date).add(amount, 'day').toDate();

export const addWeeks = (date: Date | string | dayjs.Dayjs, amount: number) => dayjs(date).add(amount, 'week').toDate();

export const addMonths = (date: Date | string | dayjs.Dayjs, amount: number) =>
  dayjs(date).add(amount, 'month').toDate();

export const addYears = (date: Date | string | dayjs.Dayjs, amount: number) => dayjs(date).add(amount, 'year').toDate();

export const subDays = (date: Date | string | dayjs.Dayjs, amount: number) =>
  dayjs(date).subtract(amount, 'day').toDate();

export const subWeeks = (date: Date | string | dayjs.Dayjs, amount: number) =>
  dayjs(date).subtract(amount, 'week').toDate();

export const subMonths = (date: Date | string | dayjs.Dayjs, amount: number) =>
  dayjs(date).subtract(amount, 'month').toDate();

export const subYears = (date: Date | string | dayjs.Dayjs, amount: number) =>
  dayjs(date).subtract(amount, 'year').toDate();

export const isSameDay = (dateLeft: Date | string | dayjs.Dayjs, dateRight: Date | string | dayjs.Dayjs) =>
  dayjs(dateLeft).isSame(dayjs(dateRight), 'day');

export const isSameMonth = (dateLeft: Date | string | dayjs.Dayjs, dateRight: Date | string | dayjs.Dayjs) =>
  dayjs(dateLeft).isSame(dayjs(dateRight), 'month');

export const isSameYear = (dateLeft: Date | string | dayjs.Dayjs, dateRight: Date | string | dayjs.Dayjs) =>
  dayjs(dateLeft).isSame(dayjs(dateRight), 'year');

export const isToday = (date: Date | string | dayjs.Dayjs) => dayjs(date).isSame(dayjs(), 'day');

export const startOfWeek = (date: Date | string | dayjs.Dayjs, options?: { weekStartsOn?: number }) => {
  const weekStartsOn = options?.weekStartsOn ?? 0; // 0 = Sunday, 1 = Monday
  const d = dayjs(date);
  const day = d.day();
  const diff = day - weekStartsOn;
  return d.subtract(diff, 'day').startOf('day').toDate();
};

export const endOfWeek = (date: Date | string | dayjs.Dayjs, options?: { weekStartsOn?: number }) => {
  const weekStartsOn = options?.weekStartsOn ?? 0; // 0 = Sunday, 1 = Monday
  const d = dayjs(date);
  const day = d.day();
  const diff = (6 - day + weekStartsOn) % 7;
  return d.add(diff, 'day').endOf('day').toDate();
};

export const startOfMonth = (date: Date | string | dayjs.Dayjs) => dayjs(date).startOf('month').toDate();

export const endOfMonth = (date: Date | string | dayjs.Dayjs) => dayjs(date).endOf('month').toDate();

export const startOfYear = (date: Date | string | dayjs.Dayjs) => dayjs(date).startOf('year').toDate();

export const endOfYear = (date: Date | string | dayjs.Dayjs) => dayjs(date).endOf('year').toDate();

export const eachDayOfInterval = (interval: {
  start: Date | string | dayjs.Dayjs;
  end: Date | string | dayjs.Dayjs;
}) => {
  const start = dayjs(interval.start);
  const end = dayjs(interval.end);
  const days: Date[] = [];

  let current = start;
  while (current.isSameOrBefore(end, 'day')) {
    days.push(current.toDate());
    current = current.add(1, 'day');
  }

  return days;
};

export const eachWeekOfInterval = (
  interval: {
    start: Date | string | dayjs.Dayjs;
    end: Date | string | dayjs.Dayjs;
  },
  _options?: { weekStartsOn?: number }
) => {
  const start = dayjs(interval.start);
  const end = dayjs(interval.end);
  const weeks: Date[] = [];

  let current = start.startOf('week');
  while (current.isSameOrBefore(end, 'week')) {
    weeks.push(current.toDate());
    current = current.add(1, 'week');
  }

  return weeks;
};

export const eachMonthOfInterval = (interval: {
  start: Date | string | dayjs.Dayjs;
  end: Date | string | dayjs.Dayjs;
}) => {
  const start = dayjs(interval.start);
  const end = dayjs(interval.end);
  const months: Date[] = [];

  let current = start.startOf('month');
  while (current.isSameOrBefore(end, 'month')) {
    months.push(current.toDate());
    current = current.add(1, 'month');
  }

  return months;
};

// date: "YYYY-MM-DD" or Date
// time: "HH:mm" or Date or null (for all-day events)
export const toLocalDateWithDayjs = ({ date, time }: { date: string | Date; time: string | Date | null }): Date => {
  const dateString = typeof date === 'string' ? date : dayjs(date).format('YYYY-MM-DD');

  // For all-day events, time is null, so we only use the date
  if (time === null) {
    return dayjs(dateString, 'YYYY-MM-DD').toDate();
  }

  const timeString = typeof time === 'string' ? time : dayjs(time).format('HH:mm');
  return dayjs(`${dateString} ${timeString}`, 'YYYY-MM-DD HH:mm').toDate();
};
