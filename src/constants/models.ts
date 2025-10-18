import { type CalendarEventFormData } from '@/types';

export const emptyCalendarEvent: CalendarEventFormData = {
  title: '',
  description: '',
  location: '',
  type: '',
  calendarId: '',
  start: { date: '', time: '' },
  end: { date: '', time: '' },
  isAllDay: false,
  formAttachment: {
    filePath: null,
    removeCurrentFile: true,
  },
};
