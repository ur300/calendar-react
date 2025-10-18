import { useTranslation } from 'react-i18next';
import { IconFileUpload, IconMapPin, IconRepeat, IconTag } from '@tabler/icons-react';
import { DateInput, TimePicker } from '@mantine/dates';
import { useScreenSize } from '@/hooks';
import { Checkbox, FileInput, Group, Switch, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import { type CalendarEventFormData, EVENT_FREQUENCY } from '@/types';
import { BasicSelect, CalendarSelect, DescriptionField, FileAttachment } from '@/components';
import styles from './CalendarEvent.module.sass';
import { MAX_EVENT_DESCRIPTION_LENGTH } from '@/constants';

type CalendarEventFormProps = {
  form: UseFormReturnType<CalendarEventFormData>;
};

export const CalendarEventForm = ({ form }: CalendarEventFormProps) => {
  const { t } = useTranslation('global');
  const { isMobile } = useScreenSize();
  const isAllDay = form.values.isAllDay ?? false;
  const repeatFrequency = form.values.eventRecurrence?.frequency;

  const repeatOptions = [
    { value: 'none', label: t('forms.calendarEvent.repeatFrequency.none') },
    { value: EVENT_FREQUENCY.DAILY, label: t('forms.calendarEvent.repeatFrequency.daily') },
    { value: EVENT_FREQUENCY.WEEKLY, label: t('forms.calendarEvent.repeatFrequency.weekly') },
    { value: EVENT_FREQUENCY.MONTHLY, label: t('forms.calendarEvent.repeatFrequency.monthly') },
    { value: EVENT_FREQUENCY.YEARLY, label: t('forms.calendarEvent.repeatFrequency.yearly') },
  ];

  const handleAllDayChange = (checked: boolean) => {
    form.setFieldValue('isAllDay', checked);

    if (checked) {
      form.setFieldValue('start.time', '');
      form.setFieldValue('end.time', '');
    }
  };

  const handleRepeatFrequencyChange = (value: string | null) => {
    if (value === null || value === 'none') {
      form.setFieldValue('eventRecurrence', undefined);
    } else {
      form.setFieldValue('eventRecurrence', {
        frequency: value as EVENT_FREQUENCY,
        interval: 1,
        byDay: null,
        until: null,
        count: null,
      });
    }
  };

  const deleteAttachment = () => {
    form.setFieldValue('formAttachment.removeCurrentFile', true);
    form.setFieldValue('filePath', null);
    form.setFieldValue('fileUrl', null);
  };

  return (
    <div className={styles.form}>
      <TextInput
        {...form.getInputProps('title')}
        size="md"
        label={t('forms.calendarEvent.titleLabel', { defaultValue: 'Title' })}
        placeholder={t('forms.calendarEvent.titlePlaceholder', { defaultValue: 'Event title' })}
        required
        aria-label={t('forms.calendarEvent.titleLabel', { defaultValue: 'Title' })}
      />

      <Group grow={!isMobile}>
        <CalendarSelect
          radius="md"
          size="md"
          label={t('forms.calendarEvent.calendarLabel')}
          required
          withShadow={true}
          wrapperClassName={styles.calendarSelect}
          showAllCalendars={false}
          showManageCalendars={false}
          leftSection={<IconTag />}
          value={form.values.calendarId || null}
          error={form.getInputProps('calendarId').error}
          onChange={(value) => form.setFieldValue('calendarId', value)}
        />

        <TextInput
          {...form.getInputProps('location')}
          size="md"
          w="100%"
          leftSection={<IconMapPin />}
          label={t('forms.calendarEvent.locationLabel')}
          placeholder={t('forms.calendarEvent.locationPlaceholder')}
          aria-label={t('forms.calendarEvent.locationLabel')}
        />
      </Group>

      <DescriptionField
        {...form.getInputProps('description')}
        label={t('forms.descriptionLabel')}
        placeholder={t('forms.descriptionPlaceholder')}
        aria-label={t('forms.descriptionLabel')}
        maxLength={MAX_EVENT_DESCRIPTION_LENGTH}
      />

      <Group>
        <Checkbox
          checked={form.values.isAllDay}
          onChange={(event) => handleAllDayChange(event.currentTarget.checked)}
          label={t('form.calendarEvent.isAllDayLabel', { defaultValue: 'All day' })}
        />
      </Group>

      <Group grow>
        <DateInput
          value={form.values.start.date}
          size="md"
          onChange={(value: unknown) => {
            const date = typeof value === 'string' ? value : '';
            form.setFieldValue('start.date', date);
          }}
          label={t('forms.calendarEvent.startDateLabel')}
          placeholder={t('forms.calendarEvent.startDateLabel')}
          required
          error={form.getInputProps('start.date').error}
        />
        <TimePicker
          value={form.values.start.time || ''}
          size="md"
          onChange={(value) => form.setFieldValue('start.time', value)}
          label={t('forms.calendarEvent.startTimeLabel')}
          disabled={isAllDay}
          withDropdown={true}
          format="12h"
          required
        />
      </Group>

      <Group grow>
        <DateInput
          value={form.values.end?.date || ''}
          size="md"
          onChange={(value: unknown) => {
            const date = typeof value === 'string' ? value : '';
            form.setFieldValue('end.date', date);
          }}
          label={t('forms.calendarEvent.endDateLabel')}
          placeholder={t('forms.calendarEvent.endDatePlaceholder')}
          error={form.getInputProps('end.date').error}
          required
        />
        <TimePicker
          value={form.values.end?.time || ''}
          size="md"
          onChange={(value) => form.setFieldValue('end.time', value)}
          label={t('forms.calendarEvent.endTimeLabel')}
          disabled={isAllDay}
          withDropdown={true}
          format="12h"
        />
      </Group>

      <Group grow={!isMobile}>
        <BasicSelect
          value={repeatFrequency || 'none'}
          onChange={handleRepeatFrequencyChange}
          options={repeatOptions}
          label={t('forms.calendarEvent.repeatLabel')}
          placeholder={t('forms.calendarEvent.repeatLabel')}
          buttonProps={{
            size: 'md',
          }}
          withShadow={true}
          leftSection={repeatFrequency ? <IconRepeat /> : null}
        />
        <DateInput
          value={form.values.eventRecurrence?.until ? new Date(form.values.eventRecurrence.until) : null}
          size="md"
          w="100%"
          onChange={(value: unknown) => {
            const date = typeof value === 'string' ? value : '';
            if (form.values.eventRecurrence) {
              form.setFieldValue('eventRecurrence.until', date);
            }
          }}
          label={t('forms.calendarEvent.repeatEndDateLabel')}
          placeholder={t('forms.calendarEvent.repeatEndDatePlaceholder')}
          disabled={!repeatFrequency}
          aria-label={t('forms.calendarEvent.repeatEndDateLabel')}
        />
      </Group>

      {form.values.filePath && form.values.fileUrl && (
        <FileAttachment filePath={form.values.filePath} fileUrl={form.values.fileUrl} onDelete={deleteAttachment} />
      )}
      {!form.values?.filePath && !form.values?.fileUrl && (
        <FileInput
          {...form.getInputProps('formAttachment.filePath')}
          leftSection={<IconFileUpload size={18} />}
          label={t('forms.calendarEvent.formAttachedLabel')}
          placeholder={t('forms.calendarEvent.formAttachedPlaceholder')}
          leftSectionPointerEvents="none"
          accept="application/pdf"
          clearable
        />
      )}

      <Switch
        className={styles.switch}
        checked={form.values.allowRsvp}
        size="md"
        labelPosition="left"
        onChange={(event) => form.setFieldValue('allowRsvp', event.currentTarget.checked)}
        label={t('forms.calendarEvent.allowRsvpLabel')}
      />
    </div>
  );
};
