import {
  CALENDAR_VIEW,
  type Calendar,
  type CalendarEventFormData,
  type CalendarEventType,
  type CalendarEventsFilters,
  type CalendarSettings,
} from '@/types';
import { paletteColorCalendar, paletteColorCalendarEvents, paletteColorCalendarText } from '@/styles/palette';
import dayjs, {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  toLocalDateWithDayjs,
} from '@/utils/dayjs';
import { emptyCalendarEvent } from '@/constants';

/**
 * Converts date strings from API response to Date objects for CalendarEvent and adds calendar color
 * @param events - Array of calendar events with date strings
 * @param calendars - Array of calendars to map colors from
 * @returns Array of calendar events with Date objects and color
 */
export const transformCalendarEvents = (
  events: CalendarEventType[],
  calendars: Calendar[] = []
): CalendarEventType[] => {
  return events.map((event) => {
    let color = paletteColorCalendarEvents[0]; // Default to first event color
    let textColor = paletteColorCalendarText[0]; // Default to first event text color
    let calendarColor = paletteColorCalendar[0];

    if (event.calendar.id) {
      // For events with calendarId property, find the matching calendar
      const calendar = calendars.find((cal) => cal.id === event.calendar.id);
      if (calendar?.color) {
        const colorIndex = paletteColorCalendar.findIndex((paletteColor) => paletteColor === calendar.color);
        if (colorIndex !== -1 && paletteColorCalendarEvents[colorIndex]) {
          color = paletteColorCalendarEvents[colorIndex];
          textColor = paletteColorCalendarText[colorIndex];
          calendarColor = paletteColorCalendar[colorIndex];
        }
      }
    }

    return {
      ...event,
      startDate: toLocalDateWithDayjs({
        date: event.startDate,
        time: event.isAllDay ? null : event.startTime,
      }),
      endDate: toLocalDateWithDayjs({
        date: event.endDate,
        time: event.isAllDay ? null : event.endTime,
      }),
      color,
      textColor,
      calendarColor,
    };
  });
};

export const getCalendarEventsFilters = (calendarSettings: CalendarSettings): CalendarEventsFilters => {
  if (calendarSettings.view === CALENDAR_VIEW.DAY) {
    return {
      date: calendarSettings.date.toISOString(),
    };
  }
  if (calendarSettings.view === CALENDAR_VIEW.WEEK) {
    const start = startOfWeek(calendarSettings.date, { weekStartsOn: 0 });
    const end = endOfWeek(calendarSettings.date, { weekStartsOn: 0 });
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }
  if (calendarSettings.view === CALENDAR_VIEW.MONTH) {
    const start = startOfMonth(calendarSettings.date);
    const end = endOfMonth(calendarSettings.date);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }
  if (calendarSettings.view === CALENDAR_VIEW.YEAR) {
    const start = startOfYear(calendarSettings.date);
    const end = endOfYear(calendarSettings.date);
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  }

  return {
    date: calendarSettings.date.toISOString(),
  };
};

export const prepareEventForForm = (event: CalendarEventType | undefined | null): CalendarEventFormData => {
  if (event) {
    return {
      ...emptyCalendarEvent,
      ...event,
      calendarId: event.calendar.id,
      start: {
        date: dayjs(event.startDate).format('YYYY-MM-DD'),
        time: event.isAllDay ? undefined : dayjs(event.startDate).format('HH:mm'),
      },
      end: {
        date: dayjs(event.endDate).format('YYYY-MM-DD'),
        time: event.isAllDay ? undefined : dayjs(event.endDate).format('HH:mm'),
      },
      formAttachment: {
        filePath: event.filePath,
        removeCurrentFile: false,
      },
    };
  }

  return emptyCalendarEvent;
};
