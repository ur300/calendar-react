import type { UploadEventFileRequestParams } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from '@/hooks';

export const useUploadEventFileMutation = () => {
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ calendarId, file }: UploadEventFileRequestParams) => {
      if (!calendarId || !file) {
        throw new Error('Calendar ID and file are required');
      }
      // Mock implementation - just return a promise that resolves with a mock file path
      return new Promise<{ filePath: string }>((resolve) => {
        setTimeout(() => {
          resolve({ filePath: `/uploads/mock-file-${Date.now()}.pdf` });
        }, 1000);
      });
    },
    onMutate: () => {
      showLoadingNotification({
        action: 'uploading file',
      });
    },
    onSuccess: () => {
      showSuccessNotification({
        action: 'uploaded file',
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
