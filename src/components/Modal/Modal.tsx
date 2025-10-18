import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal as MantineModal, type ModalProps } from '@mantine/core';
import styles from './Modal.module.sass';

type BaseModalProps = Omit<ModalProps, 'classNames'> & {
  children: ReactNode;
  isLoading?: boolean;
  submitButtonLabel?: string;
  onCancel: () => void;
};

type ModalWithFooter = BaseModalProps & {
  hideFooter?: false;
  onSubmit: () => void;
};

type ModalWithoutFooter = BaseModalProps & {
  hideFooter?: true;
  onSubmit?: () => void;
};

type SharedModalProps = ModalWithFooter | ModalWithoutFooter;

export const Modal = ({
  children,
  isLoading,
  submitButtonLabel,
  hideFooter = false,
  onSubmit,
  onCancel,
  ...props
}: SharedModalProps) => {
  const { t } = useTranslation('global');
  return (
    <MantineModal
      classNames={{
        title: styles.modalTitle,
        header: styles.modalHeader,
      }}
      padding={0}
      {...props}
    >
      <div className={styles.modalContent}>{children}</div>
      {!hideFooter && (
        <div className={styles.modalFooter}>
          <Button variant="outline" radius="xl" onClick={onCancel}>
            {t('cancelButtonLabel', { ns: 'global' })}
          </Button>
          <Button variant="filled" radius="xl" onClick={onSubmit} disabled={isLoading}>
            {submitButtonLabel || t('submitButtonLabel', { ns: 'global' })}
          </Button>
        </div>
      )}
    </MantineModal>
  );
};
