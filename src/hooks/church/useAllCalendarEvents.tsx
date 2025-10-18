import { QUERY_KEYS } from '@/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { CalendarEventType, CalendarEventsFilters } from '@/types';
import { mockEvents } from '@/data/mockData';

export const useAllCalendarEvents = (
  filters: CalendarEventsFilters,
) => {
  return useQuery<CalendarEventType[]>({
    queryKey: [QUERY_KEYS.CALENDAR_EVENTS, 'all', filters],
    queryFn: () => {
      // Return all events for "all" calendars view
      return Promise.resolve(mockEvents);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
