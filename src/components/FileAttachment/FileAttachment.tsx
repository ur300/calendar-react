import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { IconDownload, IconPaperclip, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { downloadFile } from '@/helpers';

type FileAttachmentProps = {
  filePath: string;
  fileUrl: string;
  onDelete?: () => void;
};

export const FileAttachment = ({ filePath, fileUrl, onDelete }: FileAttachmentProps) => {
  const { t } = useTranslation('global');

  return (
    <div>
      <Group gap="xs" mb="xs">
        <IconPaperclip size={16} />
        <Text>{t('forms.calendarEvent.formAttachedLabel')}</Text>
      </Group>
      <Group gap="xs" pl="md">
        <Button
          color="base"
          radius="sm"
          variant="light"
          justify="space-between"
          rightSection={<IconDownload size={14} />}
          onClick={() => downloadFile(fileUrl, filePath)}
        >
          {filePath}
        </Button>
        {onDelete && (
          <ActionIcon color="fail" radius="sm" variant="transparent" onClick={onDelete}>
            <IconX size={20} />
          </ActionIcon>
        )}
      </Group>
    </div>
  );
};
