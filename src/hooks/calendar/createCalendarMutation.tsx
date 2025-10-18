import type { Calendar } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';
import CalendarService from '@/services/calendar.service';
import { QUERY_KEYS } from '@/constants';

export const useCreateCalendarMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ churchId, data }: { churchId: string; data: Calendar }) =>
      CalendarService.createCalendar(churchId, data),
    onMutate: () => {
      showLoadingNotification({
        action: 'creating calendar',
      });
    },
    onSuccess: (_data, { churchId }) => {
      showSuccessNotification({
        action: 'created calendar',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDARS, churchId],
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
