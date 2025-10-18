import { type ReactNode, useCallback } from 'react';
import { type DefaultMantineColor } from '@mantine/core';
import classNames from 'classnames';
import { IconCalendarWeek } from '@tabler/icons-react';
import type { InputBaseProps } from '@mantine/core';
import { BasicSelect } from '@/components/BasicSelect/BasicSelect';
import { useCalendars } from '@/hooks';
import type { Calendar } from '@/types';
import styles from './CalendarSelect.module.sass';
import { buildCalendarOptions } from '@/components/utils/buildCalendarOptions';

type CalendarSelectProps = {
  calendars?: Calendar[];
  value?: string | null;
  isLoading?: boolean;
  placeholder?: string;
  radius?: InputBaseProps['radius'];
  size?: InputBaseProps['size'];
  buttonProps?: InputBaseProps;
  wrapperClassName?: string;
  label?: ReactNode;
  required?: boolean;
  error?: ReactNode;
  color?: DefaultMantineColor;
  withShadow?: boolean;
  showAllCalendars?: boolean;
  showManageCalendars?: boolean;
  leftSection?: ReactNode;
  onChange?: (value: string) => void;
  onManageCalendar?: () => void;
  width?: string;
};

const prepareCalendarOptions = (calendars: Calendar[], showAllCalendars: boolean, showManageCalendars: boolean) =>
  buildCalendarOptions({
    calendars,
    showAllCalendars,
    showManageCalendars,
    dotClassName: classNames(styles.calendarDot),
    allIcon: <IconCalendarWeek size={16} />,
  });

export const CalendarSelect = ({
  placeholder,
  radius = 'md',
  size = 'md',
  buttonProps,
  wrapperClassName,
  label,
  required,
  error,
  color,
  withShadow = false,
  showAllCalendars = true,
  showManageCalendars = true,
  leftSection,
  width,
  onChange,
  onManageCalendar,
  value,
}: CalendarSelectProps) => {
  const { data: calendars } = useCalendars();

  const calendarOptions = prepareCalendarOptions(calendars || [], showAllCalendars, showManageCalendars);

  const onCalendarChange = useCallback(
    (value: string) => {
      if (value === 'new') {
        onManageCalendar?.();
        return;
      }
      onChange?.(value);
    },
    [onChange, onManageCalendar]
  );

  return (
    <BasicSelect
      value={value ?? null}
      options={calendarOptions}
      leftSection={leftSection || <IconCalendarWeek size={16} />}
      placeholder={placeholder || t('selectCalendar')}
      onChange={onCalendarChange}
      wrapperClassName={wrapperClassName}
      buttonProps={{
        radius,
        size,
        ...buttonProps,
      }}
      label={label}
      required={required}
      error={error}
      color={color}
      withShadow={withShadow}
      width={width}
    />
  );
};
