import type { CalendarEventFormData } from './calendar.type';

export type UpdateEventParams = {
  calendarId: string;
  eventId: string;
  data: CalendarEventFormData;
};
