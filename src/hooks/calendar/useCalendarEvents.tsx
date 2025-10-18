import { useMemo } from 'react';
import { useAllCalendarEvents } from '@/hooks/church/useAllCalendarEvents';
import { useCalendarEventsById } from '@/hooks/calendar/useCalendarEventsById';
import type { CALENDAR_VIEW, Calendar } from '@/types';
import { getCalendarEventsFilters } from '@/helpers';

export const useCalendarEvents = (
  selectedCalendar: string,
  calendars: Calendar[] = [],
  date: Date,
  view: CALENDAR_VIEW
) => {
  const filters = useMemo(() => getCalendarEventsFilters({ date, view }), [date, view]);
  const allEventsQuery = useAllCalendarEvents(filters);
  const specificEventsQuery = useCalendarEventsById(selectedCalendar, filters, calendars);

  if (selectedCalendar === 'all') {
    return allEventsQuery;
  }

  return specificEventsQuery;
};
