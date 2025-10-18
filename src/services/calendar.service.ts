import { formatQueryString } from '@/helpers';
import apiService from './api';
import type {
  Calendar,
  CalendarEventFormData,
  CalendarEventType,
  CalendarEventsFilters,
  UploadFileResponse,
} from '@/types';

class CalendarService {
  getCalendars = async (churchId: string) => {
    try {
      const response = await apiService.get<Calendar[]>(`/admin/church/${churchId}/calendars`);
      return response.data;
    } catch (e) {
      console.error('Error fetching calendars:', e);
      throw e;
    }
  };

  createCalendar = async (churchId: string, data: Calendar) => {
    try {
      const response = await apiService.post<Calendar>(`/admin/church/${churchId}/calendars`, data);
      return response.data;
    } catch (e) {
      console.error('Error creating calendar:', e);
      throw e;
    }
  };

  updateCalendar = async (churchId: string, calendarId: string, data: Calendar) => {
    try {
      const response = await apiService.put<Calendar>(`/admin/church/${churchId}/calendars/${calendarId}`, data);
      return response.data;
    } catch (e) {
      console.error('Error updating calendar:', e);
      throw e;
    }
  };

  deleteCalendar = async (churchId: string, calendarId: string) => {
    try {
      const response = await apiService.delete<void>(`/admin/church/${churchId}/calendars/${calendarId}`);
      return response.data;
    } catch (e) {
      console.error('Error deleting calendar:', e);
      throw e;
    }
  };

  getEventsById = async (calendarId: string, filters: CalendarEventsFilters) => {
    try {
      const response = await apiService.get<CalendarEventType[]>(
        `/admin/calendars/${calendarId}/events${formatQueryString({
          ...filters,
        })}`
      );
      return response.data;
    } catch (e) {
      console.error('Error fetching events:', e);
      throw e;
    }
  };

  addEvent = async (calendarId: string, data: CalendarEventFormData) => {
    try {
      const response = await apiService.post<CalendarEventType>(`/admin/calendars/${calendarId}/events`, data);
      return response.data;
    } catch (e) {
      console.error('Error adding event:', e);
      throw e;
    }
  };

  updateEvent = async (calendarId: string, eventId: string, data: CalendarEventFormData) => {
    try {
      const response = await apiService.put<CalendarEventType>(
        `/admin/calendars/${calendarId}/events/${eventId}`,
        data
      );
      return response.data;
    } catch (e) {
      console.error('Error updating event:', e);
      throw e;
    }
  };

  uploadEventFile = async (calendarId: string, file: File | string) => {
    try {
      const response = await apiService.post<UploadFileResponse>(
        `/admin/calendars/${calendarId}/events/upload-file`,
        { file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error('Error uploading file:', e);
      throw e;
    }
  };

  deleteEvent = async (calendarId: string, eventId: string) => {
    try {
      const response = await apiService.delete<void>(`/admin/calendars/${calendarId}/events/${eventId}`);
      return response.data;
    } catch (e) {
      console.error('Error deleting event:', e);
      throw e;
    }
  };
}

export default new CalendarService();
