import i18next from 'i18next';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { IconAlertCircle } from '@tabler/icons-react';

const composeErrorMessage = (e: unknown) => {
  if (e instanceof AxiosError) {
    let message = e?.message;
    if (e?.response?.data?.errors) {
      message = e?.response?.data?.errors.reduce(
        (acc: string, curr: string) => `${acc}\n${curr?.messages.join('')}`,
        ''
      );

      return message;
    } else {
      const responseMessage = e?.response?.data?.message || e?.response?.data?.detail;
      return responseMessage ? `${e?.message}. ${responseMessage}` : e?.message;
    }
  }

  if (e instanceof Error) {
    return e?.message;
  }

  return String(e);
};

export const handleError = (e: unknown, id?: string) => {
  const notificationProps = {
    title: i18next.t('error', { ns: 'global' }),
    message: composeErrorMessage(e),
    color: 'red',
    icon: <IconAlertCircle />,
    autoClose: false,
    withCloseButton: true,
  };

  if (id) {
    updateNotification({ id, ...notificationProps, loading: false });
  } else {
    showNotification(notificationProps);
  }
};
