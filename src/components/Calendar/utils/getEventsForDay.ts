import dayjs from 'dayjs';
import { type CalendarEventType } from '@/types';

export const getEventsForDay = (date: Date, events: CalendarEventType[]): CalendarEventType[] => {
  const dayStart = dayjs(date).startOf('day').toDate();
  const dayEnd = dayjs(date).endOf('day').toDate();

  return events.filter((event) => {
    const eventStart = dayjs(event.startDate).toDate();
    const eventEnd = dayjs(event.endDate).toDate();

    return eventStart <= dayEnd && eventEnd >= dayStart;
  });
};
