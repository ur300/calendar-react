import React from 'react';
import { IconCircleFilled, IconSettings } from '@tabler/icons-react';
import type { Calendar } from '@/types';

type BuildCalendarOptionsArgs = {
  calendars: Calendar[];
  showAllCalendars: boolean;
  showManageCalendars: boolean;
  dotClassName: string;
  allIcon: React.ReactNode;
};

export const buildCalendarOptions = ({
  calendars,
  showAllCalendars,
  showManageCalendars,
  dotClassName,
  allIcon,
}: BuildCalendarOptionsArgs) => {
  const options: Array<{ value: string; label: string; leftSection: React.ReactNode }> = [];

  if (showAllCalendars) {
    options.push({
      value: 'all',
      label: 'All Calendars',
      leftSection: <span className={dotClassName}>{allIcon}</span>,
    });
  }

  calendars.forEach((item) => {
    options.push({
      value: item.id,
      label: item.label,
      leftSection: (
        <span className={dotClassName} style={{ color: item.color }}>
          <IconCircleFilled size={16} />
        </span>
      ),
    });
  });

  if (showManageCalendars) {
    options.push({
      value: 'new',
      label: 'Manage Calendars',
      leftSection: (
        <span className={dotClassName}>
          <IconSettings size={16} />
        </span>
      ),
    });
  }

  return options;
};
