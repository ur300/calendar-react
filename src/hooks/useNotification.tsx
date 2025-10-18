import { useRef } from 'react';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { handleError } from '@/helpers';

type NotificationConfig = {
  title?: string;
  message?: string;
  action?: string;
};

export const useNotification = () => {
  const notificationId = useRef('');

  const showLoadingNotification = ({
    title = 'Loading...',
    message = 'Please wait.',
  }: NotificationConfig) => {
    notificationId.current = showNotification({
      loading: true,
      title: title,
      message: message,
      autoClose: false,
      withCloseButton: false,
    });
  };

  const showSuccessNotification = ({
    title = 'Success',
    message = 'Operation completed successfully.',
  }: NotificationConfig) => {
    updateNotification({
      id: notificationId.current,
      color: 'teal',
      title,
      message,
      icon: <IconCheck size={18} />,
      loading: false,
      autoClose: 2000,
      withCloseButton: true,
    });
  };

  const showErrorNotification = (error: unknown) => {
    handleError(error);
  };

  return {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  };
};
