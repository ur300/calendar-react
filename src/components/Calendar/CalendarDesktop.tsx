import { Suspense, lazy, useCallback, useState } from 'react';
import { CALENDAR_VIEW, type CalendarEventType, type CalendarProps } from '@/types';
import { LoaderOverlay } from '@/components';
import { useCalendarContext } from '@/providers/calendarProvider';
import { Header } from '.';
import styles from './Calendar.module.sass';

const EventDetailsView = lazy(() =>
  import('@/components/modals/EventDetailsView/EventDetailsView').then((m) => ({ default: m.EventDetailsView }))
);
const CalendarDayView = lazy(() => import('./DayView/DayView').then((m) => ({ default: m.CalendarDayView })));
const CalendarWeekView = lazy(() => import('./WeekView/WeekView').then((m) => ({ default: m.CalendarWeekView })));
const CalendarMonthView = lazy(() => import('./MonthView/MonthView').then((m) => ({ default: m.CalendarMonthView })));
const CalendarYearView = lazy(() => import('./YearView/YearView').then((m) => ({ default: m.CalendarYearView })));

export const CalendarDesktop = ({
  events,
  loading,
  handleEditEvent,
  handleDeleteEvent,
  handleAddEventClick,
  handleManageCalendarClick,
}: CalendarProps) => {
  const { selectedDate, setSelectedDate, currentView, setCurrentView } = useCalendarContext();
  const [viewingEvent, setViewingEvent] = useState<CalendarEventType | null>(null);

  const handleDateSelect = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const handleViewEvent = useCallback((event: CalendarEventType) => {
    setViewingEvent(event);
  }, []);

  const renderCalendarView = () => {
    switch (currentView) {
      case CALENDAR_VIEW.DAY:
        return <CalendarDayView date={selectedDate} events={events} onEventClick={handleViewEvent} />;
      case CALENDAR_VIEW.WEEK:
        return (
          <CalendarWeekView
            date={selectedDate}
            events={events}
            onDateSelect={handleDateSelect}
            onEventClick={handleViewEvent}
          />
        );
      case CALENDAR_VIEW.MONTH:
        return <CalendarMonthView date={selectedDate} events={events} onEventClick={handleViewEvent} />;
      case CALENDAR_VIEW.YEAR:
        return (
          <CalendarYearView
            date={selectedDate}
            events={events}
            selectedDate={selectedDate}
            onMonthSelect={() => {
              setCurrentView(CALENDAR_VIEW.MONTH);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <Header onAddEvent={handleAddEventClick} onManageCalendar={handleManageCalendarClick} />

      <div className={styles.calendarMainView}>{loading ? <LoaderOverlay /> : renderCalendarView()}</div>

      {!!viewingEvent && (
        <Suspense fallback={<LoaderOverlay />}>
          <EventDetailsView
            opened
            event={viewingEvent}
            onClose={() => setViewingEvent(null)}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </Suspense>
      )}
    </div>
  );
};
