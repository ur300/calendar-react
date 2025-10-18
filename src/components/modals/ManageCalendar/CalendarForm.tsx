import { Button, Text, TextInput } from '@mantine/core';
import { ColorPicker } from '@/components';
import formStyles from '@/styles/form.module.sass';
import { isNotEmpty, useForm } from '@mantine/form';
import { CALENDAR_TYPE, type Calendar, type CalendarFormData } from '@/types';
import styles from './ManageCalendar.module.sass';
import { IconTrash } from '@tabler/icons-react';
import { useCreateCalendarMutation, useUpdateCalendarMutation } from '@/hooks';
import { useCallback } from 'react';

type CalendarFormProps = {
  title?: string;
  isEditMode?: boolean;
  initialValues?: CalendarFormData | Calendar;
  calendarId?: string | null;
  onCancel?: () => void;
  onSuccess?: (calendarId: string) => void;
  onDelete?: () => void;
  autoFocus?: boolean;
};

export const CalendarForm = ({
  title,
  isEditMode,
  initialValues,
  calendarId,
  onCancel,
  onSuccess,
  onDelete,
  autoFocus,
}: CalendarFormProps) => {
  const { mutate: createCalendar, isPending: isCreating } = useCreateCalendarMutation();
  const { mutate: updateCalendar, isPending: isUpdating } = useUpdateCalendarMutation();

  const form = useForm<CalendarFormData>({
    initialValues: {
      label: initialValues?.label ?? '',
      type: initialValues?.type ?? CALENDAR_TYPE.LOCAL,
      color: initialValues?.color ?? '',
      isActive: initialValues?.isActive ?? true,
      url: initialValues?.url || '',
    },
    validate: {
      label: isNotEmpty('This field is required'),
      color: isNotEmpty('This field is required'),
    },
  });

  const handleSubmit = () => {
    const data: Calendar = {
      ...form.values,
      type: form.values.url ? CALENDAR_TYPE.EXTERNAL : CALENDAR_TYPE.LOCAL,
      id: calendarId ?? '',
    } as Calendar;

    if (isEditMode && calendarId) {
      updateCalendar(
        { calendarId, data },
        {
          onSuccess: () => {
            onSuccess?.(calendarId);
          },
        }
      );
      return;
    }

    createCalendar(
      { data },
      {
        onSuccess: (created) => {
          form.reset();
          onSuccess?.(created.id);
        },
      }
    );
  };

  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  return (
    <div>
      <Text className={styles.title}>{title ?? (isEditMode ? null : 'Create New Calendar')}</Text>
      <div className={formStyles.formRow}>
        <TextInput
          {...form.getInputProps('label')}
          label="Calendar Name"
          required
          size="md"
          placeholder="Enter calendar name"
          aria-label="Calendar Name"
          data-autofocus={autoFocus ? 'true' : undefined}
        />
      </div>

      <div className={formStyles.formRow}>
        <ColorPicker
          {...form.getInputProps('color')}
          label="Calendar Color"
          required
          error={form.errors.color}
          aria-label="Calendar Color"
          withPicker={false}
          swatchesPerRow={16}
          format="hex"
        />
      </div>

      <div className={formStyles.formRow}>
        <TextInput
          size="md"
          {...form.getInputProps('url')}
          label="Google Calendar URL"
          placeholder="Enter Google Calendar URL"
          aria-label="Google Calendar URL"
        />
      </div>
      <div className={styles.formActions}>
        {isEditMode ? (
          <>
            <Button variant="filled" radius="xl" onClick={() => form.onSubmit(handleSubmit)()} disabled={isUpdating}>
              Save Changes
            </Button>
            <Button
              variant="transparent"
              color="fail"
              radius="xl"
              onClick={handleDelete}
              aria-label="Delete"
            >
              <IconTrash size={22} />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" radius="xl" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="filled" radius="xl" onClick={() => form.onSubmit(handleSubmit)()} disabled={isCreating}>
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
