import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '@/hooks';
import type { CalendarEventFormData, CalendarEventType } from '@/types';
import { EVENT_FREQUENCY } from '@/types';
import { QUERY_KEYS } from '@/constants';
import { mockCalendars } from '@/data/mockData';

export const useAddEventMutation = () => {
  const queryClient = useQueryClient();
  const { showLoadingNotification, showSuccessNotification, showErrorNotification } = useNotification();

  return useMutation({
    mutationFn: ({ calendarId, data }: { calendarId: string; data: CalendarEventFormData }) => {
      // Mock implementation - just return a promise that resolves
      return new Promise<CalendarEventType>((resolve) => {
        setTimeout(() => {
          const calendar = mockCalendars.find(cal => cal.id === calendarId);
          const newEvent: CalendarEventType = {
            id: Date.now().toString(),
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
            color: calendar?.color || '#3b82f6',
            textColor: '#ffffff',
            calendar: calendar || mockCalendars[0],
            calendarColor: calendar?.color || '#3b82f6',
            eventRecurrence: data.eventRecurrence || {
              frequency: EVENT_FREQUENCY.NONE,
              interval: 1,
              byDay: null,
              until: null,
              count: null,
            },
            eventExceptions: [],
          };
          resolve(newEvent);
        }, 500);
      });
    },
    onMutate: () => {
      showLoadingNotification({
        action: 'adding event',
      });
    },
    onSuccess: () => {
      showSuccessNotification({
        action: 'added event',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHURCH_BASE_QUERY_KEY, QUERY_KEYS.CALENDAR_EVENTS],
      });
    },
    onError: (error) => showErrorNotification(error),
  });
};
