import type { Calendar } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';
import CalendarService from '@/services/calendar.service';
import { QUERY_KEYS } from '@/constants';

export const useUpdateCalendarMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ calendarId, data }: { calendarId: string; data: Calendar }) =>
      CalendarService.updateCalendar(calendarId, data),
    onMutate: () => {
      showLoadingNotification({
        action: 'updating calendar',
      });
    },
    onSuccess: (_data) => {
      showSuccessNotification({
        action: 'updated calendar',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDARS],
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
