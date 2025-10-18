import { useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { CustomModal } from '@/components';
import type { CalendarEventFormData, CalendarEventType } from '@/types';
import { MAX_EVENT_DESCRIPTION_LENGTH, MAX_LOCATION_LENGTH, MAX_TITLE_LENGTH } from '@/constants';
import { CalendarEventForm } from './CalendarEventForm.tsx';
import { prepareEventForForm } from '@/helpers';

type CalendarEventModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (args: { values: CalendarEventFormData }) => void;
  eventToEdit?: CalendarEventType | null;
  isLoading?: boolean;
};

export const CalendarEvent = ({ opened, onClose, onSubmit, eventToEdit, isLoading }: CalendarEventModalProps) => {
  const { t } = useTranslation('global');
  const form = useForm<CalendarEventFormData>({
    initialValues: prepareEventForForm(eventToEdit),
    validate: {
      title: (value) =>
        isNotEmpty(t('forms.requiredText'))(value) ||
        hasLength({ max: MAX_TITLE_LENGTH }, t('forms.titleMaxLength', { maxLength: MAX_TITLE_LENGTH }))(value),
      location: hasLength(
        { max: MAX_LOCATION_LENGTH },
        t('forms.locationMaxLength', { maxLength: MAX_LOCATION_LENGTH })
      ),
      calendarId: isNotEmpty(t('forms.requiredText')),
      start: {
        date: isNotEmpty(t('forms.requiredText')),
      },
      end: {
        date: isNotEmpty(t('forms.requiredText')),
      },
      description: hasLength(
        { max: MAX_EVENT_DESCRIPTION_LENGTH },
        t('forms.descriptionMaxLength', { maxLength: MAX_EVENT_DESCRIPTION_LENGTH })
      ),
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    onSubmit({ values: form.values });
  };

  return (
    <CustomModal
      opened={opened}
      isLoading={isLoading}
      title={eventToEdit ? t('calendar.editEventModalTitle') : t('calendar.createEventModalTitle')}
      size="41rem"
      submitButtonSlot={
        <Button variant="filled" size="sm" onClick={handleSubmit}>
          {eventToEdit ? t('calendar.editEventButtonLabel') : t('calendar.createEventButtonLabel')}
        </Button>
      }
      onClose={onClose}
    >
      <CalendarEventForm form={form} />
    </CustomModal>
  );
};
