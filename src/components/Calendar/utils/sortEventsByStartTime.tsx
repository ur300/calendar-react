import dayjs from 'dayjs';
import { type CalendarEventType } from '@/types';

export const sortEventsByStartTime = (dayEvents: CalendarEventType[]): CalendarEventType[] => {
  return [...dayEvents].sort((a, b) => {
    if (a.isAllDay && !b.isAllDay) return -1;
    if (!a.isAllDay && b.isAllDay) return 1;
    const aTime = dayjs(a.startTime || a.startDate).valueOf();
    const bTime = dayjs(b.startTime || b.startDate).valueOf();
    return aTime - bTime;
  });
};
