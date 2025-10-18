import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';
import { QUERY_KEYS } from '@/constants';

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ }: { calendarId: string; eventId: string }) => {
      // Mock implementation - just return a promise that resolves
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    onMutate: () => {
      showLoadingNotification({
        action: 'deleting event',
      });
    },
    onSuccess: () => {
      showSuccessNotification({
        action: 'deleted event',
      });
    },
    onError: (error) => showErrorNotification(error),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDAR_EVENTS],
      });
    },
  });
};
