import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getDataFromLs, setDataToLs } from '@/helpers';
import { CALENDAR_VIEW, type CalendarSettings, LsStoreKey } from '@/types';

type CalendarContextType = {
  selectedCalendar: string;
  setSelectedCalendar: (calendarId: string) => void;

  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  currentView: CALENDAR_VIEW;
  setCurrentView: (view: CALENDAR_VIEW) => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

type CalendarProviderProps = {
  children: ReactNode;
};

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [selectedCalendar, setSelectedCalendarState] = useState<string>('all');
  const [selectedDate, setSelectedDateState] = useState<Date>(new Date());
  const [currentView, setCurrentViewState] = useState<CALENDAR_VIEW>(CALENDAR_VIEW.DAY);

  useEffect(() => {
    const storedCalendar = getDataFromLs(LsStoreKey.SelectedCalendar);
    if (storedCalendar) {
      setSelectedCalendarState(storedCalendar);
    }

    const storedCalendarSettings = getDataFromLs(LsStoreKey.CalendarSettings);
    if (storedCalendarSettings) {
      setSelectedDateState(new Date(storedCalendarSettings.date));
      setCurrentViewState(storedCalendarSettings.view);
    }
  }, []);

  const setSelectedCalendar = useCallback((calendarId: string) => {
    setSelectedCalendarState(calendarId);
    setDataToLs(LsStoreKey.SelectedCalendar, calendarId);
  }, []);

  const setSelectedDate = useCallback(
    (date: Date) => {
      setSelectedDateState(date);
      setDataToLs(LsStoreKey.CalendarSettings, { date, view: currentView } satisfies CalendarSettings);
    },
    [currentView]
  );

  const setCurrentView = useCallback(
    (view: CALENDAR_VIEW) => {
      setCurrentViewState(view);
      setDataToLs(LsStoreKey.CalendarSettings, { date: selectedDate, view } satisfies CalendarSettings);
    },
    [selectedDate]
  );

  const value: CalendarContextType = {
    selectedCalendar,
    setSelectedCalendar,
    selectedDate,
    setSelectedDate,
    currentView,
    setCurrentView,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};
