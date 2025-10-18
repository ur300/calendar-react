import { useTranslation } from 'react-i18next';
import { Button, type ModalProps, Text } from '@mantine/core';
import { Modal } from '@/components';
import styles from './ConfirmationModal.module.sass';
import type { ExtendedCustomColors } from '@/types';

type ConfirmationModalProps = {
  opened: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: ExtendedCustomColors;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
} & Omit<
  ModalProps,
  'opened' | 'onClose' | 'title' | 'children' | 'onCancel' | 'onSubmit' | 'submitButtonLabel' | 'hideFooter'
>;

export const ConfirmationModal = ({
  opened,
  title,
  message,
  confirmLabel,
  cancelLabel,
  color = 'base',
  isLoading = false,
  onConfirm,
  onCancel,
  onClose,
  ...modalProps
}: ConfirmationModalProps) => {
  const { t } = useTranslation('global');

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      onCancel={handleCancel}
      onSubmit={handleConfirm}
      submitButtonLabel={confirmLabel || t('confirmButtonLabel')}
      isLoading={isLoading}
      size="sm"
      hideFooter={true}
      {...modalProps}
    >
      <div>
        <Text className={styles.message}>{message}</Text>
      </div>
      <div className={styles.footer}>
        <Button variant="filled" color={color} radius="xl" onClick={onConfirm} disabled={isLoading}>
          {confirmLabel || t('submitButtonLabel', { ns: 'global' })}
        </Button>
        <Button variant="outline" color="base" radius="xl" onClick={onCancel}>
          {cancelLabel || t('cancelButtonLabel', { ns: 'global' })}
        </Button>
      </div>
    </Modal>
  );
};
