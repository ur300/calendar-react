import { QUERY_KEYS } from '@/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { mockCalendars } from '@/data/mockData';

export const useCalendars = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALENDARS],
    queryFn: () => Promise.resolve(mockCalendars),
    placeholderData: keepPreviousData,
  });
};
