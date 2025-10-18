import { Modal as MantineModal } from '@mantine/core';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ opened, onClose, title, children }: ModalProps) => {
  return (
    <MantineModal opened={opened} onClose={onClose} title={title}>
      {children}
    </MantineModal>
  );
};
