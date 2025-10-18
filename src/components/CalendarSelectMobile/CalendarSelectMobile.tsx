import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Combobox, useCombobox } from '@mantine/core';
import { IconCalendarMonth } from '@tabler/icons-react';
import classNames from 'classnames';
import { useCalendars } from '@/hooks';
import type { Calendar } from '@/types';
import styles from './CalendarSelectMobile.module.sass';
import { buildCalendarOptions } from '@/components/utils/buildCalendarOptions';

type CalendarSelectMobileProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  onManageCalendar?: () => void;
  showAllCalendars?: boolean;
  showManageCalendars?: boolean;
};

const buildOptions = (calendars: Calendar[], showAllCalendars: boolean, showManageCalendars: boolean) =>
  buildCalendarOptions({
    calendars,
    showAllCalendars,
    showManageCalendars,
    dotClassName: classNames(styles.calendarDot),
    allIcon: <IconCalendarMonth size={16} />,
  });

export const CalendarSelectMobile = ({
  value,
  onChange,
  onManageCalendar,
  showAllCalendars = true,
  showManageCalendars = true,
}: CalendarSelectMobileProps) => {
  const { t } = useTranslation('global');
  const { data: calendars } = useCalendars();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = useMemo(
    () => buildOptions(calendars || [], showAllCalendars, showManageCalendars),
    [calendars, showAllCalendars, showManageCalendars]
  );

  const handleSubmit = useCallback(
    (val: string) => {
      if (val === 'new') {
        onManageCalendar?.();
        return;
      }
      onChange?.(val);
    },
    [onChange, onManageCalendar]
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        handleSubmit(val);
        combobox.closeDropdown();
      }}
      classNames={{ dropdown: styles.dropdown }}
      withinPortal={true}
      width="max-content"
    >
      <Combobox.Target>
        <ActionIcon
          variant="transparent"
          color="base"
          size="xl"
          radius="xl"
          aria-label={t('selectCalendar')}
          title={t('selectCalendar')}
          onClick={() => combobox.toggleDropdown()}
        >
          <IconCalendarMonth size={28} />
        </ActionIcon>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map(({ value: optionValue, label, leftSection }) => (
            <Combobox.Option
              key={optionValue}
              value={optionValue}
              active={optionValue === value}
              className={styles.option}
            >
              {leftSection}
              <span>{label}</span>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
