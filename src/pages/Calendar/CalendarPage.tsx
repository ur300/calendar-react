import { Suspense, lazy, useCallback, useState } from 'react';
import type { CalendarEventFormData, CalendarEventType } from '@/types';
import { Calendar, ConfirmationModal } from '@/components';
import { CalendarProvider } from '@/providers';
import {
  useAddEventMutation,
  useCalendarContext,
  useCalendarEvents,
  useCalendars,
  useDeleteEventMutation,
  useUpdateCalendarEventMutation,
  useUploadEventFileMutation,
} from '@/hooks';
import styles from './CalendarPage.module.sass';

const ManageCalendarModal = lazy(() =>
  import('@/components/modals/ManageCalendar/ManageCalendar').then((m) => ({ default: m.ManageCalendar }))
);
const CalendarEventModal = lazy(() =>
  import('@/components/modals/CalendarEvent/CalendarEventModal').then((m) => ({ default: m.CalendarEvent }))
);

const CalendarPageContent = () => {
  const { selectedCalendar, setSelectedCalendar, selectedDate, currentView } = useCalendarContext();
  const { data: calendarsData } = useCalendars();
  const { data: events, isFetching } = useCalendarEvents(
    selectedCalendar,
    calendarsData,
    selectedDate,
    currentView
  );
  const { mutate: addEvent } = useAddEventMutation();
  const { mutate: uploadEventFile } = useUploadEventFileMutation();
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEventType | null>(null);
  const [isManageCalendarOpen, setIsManageCalendarOpen] = useState<boolean>(false);
  const { mutate: updateEventMutation, isPending: isUpdatingEvent } = useUpdateCalendarEventMutation();
  const { mutate: deleteEventMutation, isPending: isDeletingEvent } = useDeleteEventMutation();
  const [eventToDelete, setEventToDelete] = useState<CalendarEventType | null>(null);

  const handleAddEventClick = useCallback(() => {
    setEditingEvent(null);
    setIsEventModalOpen(true);
  }, []);

  const handleManageCalendarClick = useCallback(() => {
    setIsManageCalendarOpen(true);
  }, []);

  const handleEditEvent = useCallback((event: CalendarEventType) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  }, []);

  const handleDeleteEvent = useCallback((event: CalendarEventType) => {
    setEventToDelete(event);
  }, []);

  const handleCancelDeleteEvent = useCallback(() => {
    setEventToDelete(null);
  }, []);

  const handleConfirmDeleteEvent = useCallback(() => {
    if (!eventToDelete) return;
    deleteEventMutation(
      { calendarId: eventToDelete.calendar.id, eventId: eventToDelete.id },
      {
        onSettled: () => setEventToDelete(null),
      }
    );
  }, [deleteEventMutation, eventToDelete]);

  const submitEvent = useCallback(
    (values: CalendarEventFormData) => {
      const closeModal = () => {
        setIsEventModalOpen(false);
        setEditingEvent(null);
      };

      const isEdit = Boolean(editingEvent?.id);
      const calendarId = values.calendarId;

      if (!calendarId) return;

      const runCreate = (payload: CalendarEventFormData) =>
        addEvent({ calendarId, data: payload }, { onSuccess: closeModal });

      const runUpdate = (payload: CalendarEventFormData) => {
        if (!editingEvent?.id) return;
        updateEventMutation({ calendarId, eventId: editingEvent.id, data: payload }, { onSuccess: closeModal });
      };

      const invokeMutation = (payload: CalendarEventFormData) => {
        if (isEdit) {
          runUpdate(payload);
          return;
        }
        runCreate(payload);
      };

      const filePathValue = values.formAttachment?.filePath;
      const shouldUpload = filePathValue instanceof File;

      if (shouldUpload) {
        uploadEventFile(
          { calendarId, file: filePathValue },
          {
            onSuccess: (response) => {
              const payload: CalendarEventFormData = {
                ...values,
                formAttachment: {
                  filePath: response.filePath,
                  removeCurrentFile: values.formAttachment?.removeCurrentFile ?? false,
                },
              };
              invokeMutation(payload);
            },
          }
        );
        return;
      }

      const payload = { ...values } as CalendarEventFormData;
      delete (payload as any).formAttachment;
      invokeMutation(payload);
    },
    [addEvent, updateEventMutation, uploadEventFile, editingEvent]
  );

  const handleSaveEvent = useCallback(
    ({ values }: { values: CalendarEventFormData }) => {
      submitEvent(values);
    },
    [submitEvent]
  );

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        events={events || []}
        loading={isFetching}
        handleEditEvent={handleEditEvent}
        handleDeleteEvent={handleDeleteEvent}
        handleAddEventClick={handleAddEventClick}
        handleManageCalendarClick={handleManageCalendarClick}
      />

      {isEventModalOpen && (
        <Suspense fallback={null}>
          <CalendarEventModal
            opened
            eventToEdit={editingEvent}
            onClose={() => setIsEventModalOpen(false)}
            onSubmit={handleSaveEvent}
            isLoading={isUpdatingEvent}
          />
        </Suspense>
      )}

      {isManageCalendarOpen && (
        <Suspense fallback={null}>
          <ManageCalendarModal opened onSuccess={setSelectedCalendar} onClose={() => setIsManageCalendarOpen(false)} />
        </Suspense>
      )}

      <ConfirmationModal
        opened={!!eventToDelete}
        onClose={handleCancelDeleteEvent}
        onCancel={handleCancelDeleteEvent}
        onConfirm={handleConfirmDeleteEvent}
        isLoading={isDeletingEvent}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        confirmLabel="Delete"
        color="fail"
      />
    </div>
  );
};

export const CalendarPage = () => {
  return (
    <CalendarProvider>
      <CalendarPageContent />
    </CalendarProvider>
  );
};
