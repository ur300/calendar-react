import { Suspense, lazy, useCallback, useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { Modal } from '@/components';
import { MANAGE_CALENDAR_VIEW } from '@/types';
import { CalendarForm } from './CalendarForm';
import styles from './ManageCalendar.module.sass';

const CalendarsList = lazy(async () => import('./CalendarsList').then((m) => ({ default: m.CalendarsList })));

type ManageCalendarProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess: (calendarId: string) => void;
};

export const ManageCalendar = ({ opened, onClose, onSuccess }: ManageCalendarProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleModalClose = useCallback(() => {
    setIsEditMode(false);
    onClose();
  }, [setIsEditMode, onClose]);

  const handleViewChange = useCallback(
    (value: string) => {
      setIsEditMode(value === MANAGE_CALENDAR_VIEW.EDIT);
    },
    [setIsEditMode]
  );

  const handleEdit = useCallback(() => {
    setIsEditMode(true);
  }, [setIsEditMode]);

  return (
    <Modal
      opened={opened}
      onClose={handleModalClose}
      title="Manage Calendar"
      size="38rem"
      onCancel={handleModalClose}
      hideFooter={true}
    >
      <SegmentedControl
        classNames={{
          root: styles.segmentedControl,
        }}
        fullWidth
        withItemsBorders={false}
        radius="xl"
        value={isEditMode ? MANAGE_CALENDAR_VIEW.EDIT : MANAGE_CALENDAR_VIEW.NEW}
        data={[
          { label: 'Create New Calendar', value: MANAGE_CALENDAR_VIEW.NEW },
          { label: 'Edit Calendar', value: MANAGE_CALENDAR_VIEW.EDIT },
        ]}
        onChange={handleViewChange}
      />
      <Suspense fallback={null}>
        {isEditMode ? (
          <CalendarsList onEdit={handleEdit} />
        ) : (
          <CalendarForm
            isEditMode={false}
            onCancel={handleModalClose}
            onSuccess={(id) => {
              onSuccess(id);
              onClose();
            }}
            autoFocus={true}
          />
        )}
      </Suspense>
    </Modal>
  );
};
