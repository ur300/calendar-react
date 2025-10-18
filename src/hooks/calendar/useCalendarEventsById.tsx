import { QUERY_KEYS } from '@/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Calendar, CalendarEventType, CalendarEventsFilters } from '@/types';
import { mockEvents } from '@/data/mockData';

export const useCalendarEventsById = (
  calendarId: string,
  filters: CalendarEventsFilters,
  calendars: Calendar[] = []
) => {
  return useQuery<CalendarEventType[]>({
    queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDAR_EVENTS, calendarId, filters],
    queryFn: () => {
      // Filter events by calendar ID
      const filteredEvents = mockEvents.filter(event => event.calendar.id === calendarId);
      return Promise.resolve(filteredEvents);
    },
    placeholderData: keepPreviousData,
    enabled: !!calendarId && calendarId !== 'all',
    staleTime: 1000 * 60 * 5,
  });
};
