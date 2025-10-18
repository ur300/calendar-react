import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../useNotification';
import { type UpdateEventParams, type CalendarEventType, EVENT_FREQUENCY, CALENDAR_TYPE } from '@/types';
import { QUERY_KEYS } from '@/constants';

export const useUpdateCalendarEventMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ calendarId, eventId, data }: UpdateEventParams) => {
      // Mock implementation - just return a promise that resolves
      return new Promise<CalendarEventType>((resolve) => {
        setTimeout(() => {
          const updatedEvent: CalendarEventType = {
            id: eventId,
            title: data.title,
            description: data.description || '',
            location: data.location || '',
            type: data.type || '',
            startDate: new Date(data.start.date),
            endDate: data.end ? new Date(data.end.date) : new Date(data.start.date),
            startTime: data.start.time ? new Date(`${data.start.date}T${data.start.time}`) : null,
            endTime: data.end?.time ? new Date(`${data.end.date}T${data.end.time}`) : null,
            isAllDay: data.isAllDay || false,
            allowRsvp: data.allowRsvp || false,
            filePath: data.filePath || null,
            fileUrl: data.fileUrl || null,
            color: '#3b82f6',
            textColor: '#ffffff',
            calendar: { id: calendarId, label: 'Calendar', type: CALENDAR_TYPE.LOCAL, color: '#3b82f6', isActive: true, url: undefined, massTimesType: null },
            calendarColor: '#3b82f6',
            eventRecurrence: data.eventRecurrence || {
              frequency: EVENT_FREQUENCY.NONE,
              interval: 1,
              byDay: null,
              until: null,
              count: null,
            },
            eventExceptions: [],
          };
          resolve(updatedEvent);
        }, 500);
      });
    },
    onMutate: () => {
      showLoadingNotification({
        action: 'updating event',
      });
    },
    onSuccess: () => {
      showSuccessNotification({
        action: 'updated event',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDAR_EVENTS],
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
