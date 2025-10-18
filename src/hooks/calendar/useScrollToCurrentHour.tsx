import React, { useCallback, useEffect, useRef } from 'react';

type UseScrollToCurrentHourArgs = {
  date: Date;
  isEnabled?: boolean;
  offsetPx?: number;
  hourHeightPx?: number;
  smooth?: boolean;
  delayMs?: number;
};

type UseScrollToCurrentHourResult = {
  viewportRef: React.RefObject<HTMLDivElement | null>;
  scrollToCurrentHour: () => void;
};

export const useScrollToCurrentHour = ({
  date,
  isEnabled = true,
  offsetPx = 200,
  hourHeightPx = 60,
  smooth = true,
  delayMs = 100,
}: UseScrollToCurrentHourArgs): UseScrollToCurrentHourResult => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToCurrentHour = useCallback(() => {
    if (!viewportRef.current) return;

    const now = new Date();
    const isSameDay = date.toDateString() === now.toDateString();
    if (!isSameDay) return;

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const hourOffset = currentHour * hourHeightPx;
    const minuteOffset = (currentMinute / 60) * hourHeightPx;
    const scrollPosition = hourOffset + minuteOffset;
    const targetScrollTop = Math.max(0, scrollPosition - offsetPx);

    viewportRef.current.scrollTo({
      top: targetScrollTop,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [date, hourHeightPx, offsetPx, smooth]);

  useEffect(() => {
    if (!isEnabled) return;

    const timeoutId = window.setTimeout(() => {
      scrollToCurrentHour();
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [date, delayMs, isEnabled, scrollToCurrentHour]);

  return { viewportRef, scrollToCurrentHour };
};
