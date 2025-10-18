import { useCallback } from 'react';
import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconCalendarWeek,
  IconClock,
  IconEdit,
  IconLocation,
  IconRepeat,
  IconTag,
  IconTrash,
} from '@tabler/icons-react';
import { format } from '@/utils/dayjs';
import type { CalendarEventType } from '@/types';
import { ColoredSection, FileAttachment, FormattedDate, FormattedTime, Modal } from '@/components';
import { FORMAT_DATE } from '@/constants';
import styles from './EventDetailsView.module.sass';

type EventDetailsViewProps = {
  opened: boolean;
  event: CalendarEventType;
  onClose: () => void;
  onEdit: (event: CalendarEventType) => void;
  onDelete: (event: CalendarEventType) => void;
};

export const EventDetailsView = ({ opened, event, onClose, onEdit, onDelete }: EventDetailsViewProps) => {
  const { t } = useTranslation('global');
  const handleEditClick = useCallback(() => {
    if (!event) return;
    onClose();
    onEdit(event);
  }, [event, onClose, onEdit]);

  const handleDeleteClick = useCallback(() => {
    if (!event) return;
    onDelete(event);
    onClose();
  }, [event, onDelete, onClose]);

  return (
    <Modal opened={opened} onClose={onClose} size="md" onCancel={onClose} hideFooter padding="0 0 3rem 0">
      <ColoredSection color={event.calendarColor}>
        <Title order={3} className={styles.title}>
          {event.title}
        </Title>
        <Text size="inherit" className={styles.description}>
          {event.description}
        </Text>
      </ColoredSection>
      <Stack gap="xs">
        <Group gap="xs">
          <IconCalendarWeek size={16} />
          <FormattedDate startDate={event.startDate} endDate={event.endDate} />
        </Group>
        <Group gap="xs">
          <IconClock size={16} />
          <FormattedTime startDate={event.startDate} endDate={event.endDate} />
        </Group>
        {event.location && (
          <Group gap="xs">
            <IconLocation size={16} />
            <Text>{event.location}</Text>
          </Group>
        )}
        {event.type && (
          <Group gap="xs">
            <IconTag size={16} />
            <Text>{event.type}</Text>
          </Group>
        )}
        {event.eventRecurrence?.frequency && (
          <Group gap="xs">
            <IconRepeat size={16} />
            <Text>{t(`forms.calendarEvent.repeatFrequency.${event.eventRecurrence.frequency}`)},</Text>
            <Text>{event.eventRecurrence.until && format(event.eventRecurrence.until, FORMAT_DATE)}</Text>
          </Group>
        )}
        <Group gap="xs">
          <IconTag size={16} />
          <Text>{event.calendar.label}</Text>
        </Group>
        {event.filePath && event.fileUrl && <FileAttachment filePath={event.filePath} fileUrl={event.fileUrl} />}
      </Stack>

      <Group justify="flex-end" mt="3rem">
        <Button variant="outline" leftSection={<IconEdit size={16} />} onClick={handleEditClick}>
          {t('editButtonLabel')}
        </Button>
        <Button variant="outline" color="red" leftSection={<IconTrash size={16} />} onClick={handleDeleteClick}>
          {t('delete')}
        </Button>
      </Group>
    </Modal>
  );
};
