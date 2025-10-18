import { Skeleton, Text } from '@mantine/core';
import { useCalendars, useDeleteCalendarMutation } from '@/hooks';
import styles from './ManageCalendar.module.sass';
import { useCallback, useState } from 'react';
import { ConfirmationModal } from '@/components';
import { CalendarsListItem } from './CalendarsListItem';

const CalendarsListSkeleton = () => {
  return (
    <div>
      <Skeleton className={styles.skeleton} />
      <Skeleton className={styles.skeleton} />
      <Skeleton className={styles.skeleton} />
    </div>
  );
};

export const CalendarsList = ({ onEdit }: { onEdit: () => void }) => {
  const { data: calendars, isLoading } = useCalendars();
  const { mutate: deleteCalendar, isPending: isDeleting } = useDeleteCalendarMutation();
  const [confirmCalendarId, setConfirmCalendarId] = useState<string | null>(null);

  const handleRequestDelete = useCallback((id: string) => {
    setConfirmCalendarId(id);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setConfirmCalendarId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!confirmCalendarId) return;
    deleteCalendar(
      { calendarId: confirmCalendarId },
      {
        onSuccess: () => {
          setConfirmCalendarId(null);
        },
      }
    );
  }, [confirmCalendarId, deleteCalendar]);

  if (isLoading) {
    return <CalendarsListSkeleton />;
  }

  return (
    <div>
      <Text className={styles.title}>Calendar Management</Text>
      {calendars?.map((calendar) => (
        <CalendarsListItem key={calendar.id} {...calendar} onEdit={onEdit} onDelete={handleRequestDelete} />
      ))}
      <ConfirmationModal
        opened={!!confirmCalendarId}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Calendar"
        message="Are you sure you want to delete this calendar?"
        confirmLabel="Delete"
        color="fail"
      />
    </div>
  );
};
