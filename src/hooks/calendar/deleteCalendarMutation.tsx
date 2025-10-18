import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';
import CalendarService from '@/services/calendar.service';
import { QUERY_KEYS } from '@/constants';

export const useDeleteCalendarMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ calendarId }: { calendarId: string }) =>
      CalendarService.deleteCalendar(calendarId),
    onMutate: () => {
      showLoadingNotification({
        action: 'deleting calendar',
      });
    },
    onSuccess: (_data ) => {
      showSuccessNotification({
        action: 'deleted calendar',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDARS],
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
