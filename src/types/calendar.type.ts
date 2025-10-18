import {
  CALENDAR_TYPE,
  CALENDAR_VIEW,
  EVENT_BY_DAY_PATTERN,
  EVENT_FREQUENCY,
  FIRST_DAY_OF_WEEK,
} from './enums';

export type Calendar = {
  id: string;
  label: string;
  type: CALENDAR_TYPE;
  color: string;
  isActive: boolean;
  url: string | undefined;
};

export type CalendarFormData = Omit<Calendar, 'id' | 'createdAt' | 'updatedAt'>;
export type EventRecurrencePattern = {
  id?: string;
  frequency: EVENT_FREQUENCY;
  interval: number;
  byDay: EVENT_BY_DAY_PATTERN | null;
  until: string | null;
  count: number | null;
};

export type CalendarEventType = {
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string | null;
  endTime: Date | string | null;
  eventRecurrence: EventRecurrencePattern;
  eventExceptions: string[];
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  isAllDay: boolean;
  allowRsvp: boolean;
  filePath: string | null;
  fileUrl: string | null;
  color: string;
  textColor: string;
  calendar: Calendar;
  calendarColor: string;
};

export type PartialDateTime = {
  date: string;
  time?: string;
};

export type CalendarEventFormData = {
  title: string;
  description?: string;
  location?: string;
  type?: string;
  start: PartialDateTime;
  end?: PartialDateTime;
  isAllDay?: boolean;
  eventRecurrence?: EventRecurrencePattern;
  allowRsvp?: boolean;
  formAttachment?: {
    filePath: string | File | null;
    removeCurrentFile: boolean;
  };
  language?: string;
  calendarId: string;
  fileUrl?: string | null;
  filePath?: string | null;
};

export type CalendarNavigation = {
  currentDate: Date;
  view: CALENDAR_VIEW;
};

export type CalendarState = {
  selectedDate: Date;
  currentView: CALENDAR_VIEW;
  events: CalendarEventType[];
  isLoading: boolean;
  error: string | null;
};

export type CalendarSettings = {
  date: Date;
  view: CALENDAR_VIEW;
  firstDayOfWeek?: FIRST_DAY_OF_WEEK;
};

export type CalendarProps = {
  events: CalendarEventType[];
  loading: boolean;
  handleEditEvent: (event: CalendarEventType) => void;
  handleDeleteEvent: (event: CalendarEventType) => void;
  handleAddEventClick: () => void;
  handleManageCalendarClick?: () => void;
};
