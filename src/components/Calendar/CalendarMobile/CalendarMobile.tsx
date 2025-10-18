import { Suspense, lazy, startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';
import { LoaderOverlay, MiniCalendar } from '@/components';
import { CALENDAR_VIEW, type CalendarEventType, type CalendarProps, MOBILE_VIEW_STATE } from '@/types';
import { useCalendarContext } from '@/providers';
import { FIRST_DAY_OF_WEEK_DEFAULT } from '@/constants/date';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { UnstyledButton } from '@mantine/core';
import { Header } from '..';
import { EventsList } from './EventsList/EventsList';
import styles from './CalendarMobile.module.sass';

export const CalendarMobile = ({
  loading,
  handleAddEventClick,
  handleManageCalendarClick,
  handleEditEvent,
  handleDeleteEvent,
  events,
}: CalendarProps) => {
  const { selectedDate, setSelectedDate, setCurrentView } = useCalendarContext();
  const [calendarView, setCalendarView] = useState(MOBILE_VIEW_STATE.MINI);
  const [viewingEvent, setViewingEvent] = useState<CalendarEventType | null>(null);

  const EventDetailsView = lazy(() =>
    import('@/components/modals/EventDetailsView/EventDetailsView').then((m) => ({ default: m.EventDetailsView }))
  );

  const toggleCalendarView = useCallback(() => {
    startTransition(() => {
      const nextView = calendarView === MOBILE_VIEW_STATE.MINI ? MOBILE_VIEW_STATE.MONTH : MOBILE_VIEW_STATE.MINI;
      setCalendarView(nextView);
      setCurrentView(nextView === MOBILE_VIEW_STATE.MINI ? CALENDAR_VIEW.WEEK : CALENDAR_VIEW.MONTH);
    });
  }, [calendarView, setCurrentView]);

  const handleEventClick = useCallback((event: CalendarEventType) => {
    setViewingEvent(event);
  }, []);

  useEffect(() => {
    setCurrentView(calendarView === MOBILE_VIEW_STATE.MINI ? CALENDAR_VIEW.WEEK : CALENDAR_VIEW.MONTH);
  }, [calendarView, setCurrentView]);

  const normalizedEvents = useMemo(
    () =>
      events.map((event) => ({
        id: event.id,
        startTs: dayjs(event.startDate).startOf('day').valueOf(),
        endTs: dayjs(event.endDate).endOf('day').valueOf(),
        color: event.calendarColor,
      })),
    [events]
  );

  const getEventColorsForDay = useCallback(
    (date: Date): string[] => {
      const dayStartTs = dayjs(date).startOf('day').valueOf();
      const dayEndTs = dayjs(date).endOf('day').valueOf();
      // Overlap check using precomputed timestamps
      const colors: string[] = [];
      for (let i = 0; i < normalizedEvents.length; i += 1) {
        const ev = normalizedEvents[i];
        if (ev.startTs <= dayEndTs && ev.endTs >= dayStartTs) {
          colors.push(ev.color);
        }
      }
      return colors;
    },
    [normalizedEvents]
  );

  const renderDayWithDots = useCallback(
    (date: Date | string) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const dayNumber = dateObj.getDate();
      const colors = getEventColorsForDay(dateObj);

      return (
        <div className={styles.dayContainer}>
          <span className={styles.dayNumber}>{dayNumber}</span>
          {colors.length > 0 && (
            <div className={styles.eventDots}>
              {colors.map((color, index) => (
                <div key={index} className={styles.eventDot} style={{ backgroundColor: color }} />
              ))}
            </div>
          )}
        </div>
      );
    },
    [getEventColorsForDay]
  );

  return (
    <div className={styles.mobileLayout}>
      <Header
        onAddEvent={handleAddEventClick}
        onManageCalendar={handleManageCalendarClick}
        className={styles.calendarControlsHeader}
      />

      <div className={styles.calendarContainer}>
        {loading ? (
          <LoaderOverlay />
        ) : (
          <>
            {calendarView === MOBILE_VIEW_STATE.MINI && (
              <MiniCalendar date={selectedDate} renderDay={(date) => renderDayWithDots(date)} />
            )}
            {calendarView === MOBILE_VIEW_STATE.MONTH && (
              <Calendar
                minLevel="month"
                maxLevel="month"
                numberOfColumns={1}
                className={styles.calendarContainerInner}
                classNames={{ calendarHeader: styles.calendarHeader, weekday: styles.weekday }}
                firstDayOfWeek={FIRST_DAY_OF_WEEK_DEFAULT}
                date={selectedDate}
                onDateChange={(dateString: string) => setSelectedDate(new Date(dateString))}
                highlightToday
                size="lg"
                renderDay={(date) => renderDayWithDots(date)}
              />
            )}

            <UnstyledButton className={styles.calendarToggleButton} onClick={toggleCalendarView}>
              {calendarView === MOBILE_VIEW_STATE.MINI ? <IconChevronDown size={24} /> : <IconChevronUp size={24} />}
            </UnstyledButton>
          </>
        )}
      </div>
      <EventsList selectedDate={selectedDate} events={events} onEventClick={handleEventClick} />

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
