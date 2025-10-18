import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Button, Collapse, Text } from '@mantine/core';
import { IconCircleFilled, IconEdit, IconTrash, IconX } from '@tabler/icons-react';
import { type Calendar } from '@/types';
import listStyles from './CalendarsList.module.sass';
import { CalendarForm } from './CalendarForm';

export type CalendarsListItemProps = Calendar & { onEdit: (id: string) => void; onDelete: (id: string) => void };

export const CalendarsListItem = memo(
  ({ label, color, type, id, isActive, url, onEdit, onDelete }: CalendarsListItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev);
      onEdit(id);
    }, [id, onEdit]);

    return (
      <div
        className={classNames(listStyles.item, { [listStyles.itemOpen]: isOpen })}
        style={{ ['--calendar-dot-color' as any]: color }}
      >
        <div className={listStyles.itemInfo}>
          <div className={listStyles.itemContent}>
            <Text className={listStyles.title}>
              <span
                className={classNames(listStyles.calendarDot, {
                  [listStyles.empty]: !color,
                })}
              >
                <IconCircleFilled size={24} />
              </span>
              {label}
            </Text>
            <Text className={listStyles.text}>{type}</Text>
          </div>
          <div className={listStyles.itemActions}>
            {isOpen ? (
              <Button
                variant="transparent"
                color="base"
                size="xs"
                onClick={() => setIsOpen(false)}
                aria-label="Close edit form"
              >
                <IconX size={22} />
              </Button>
            ) : (
              <>
                <Button variant="transparent" color="base" size="xs" onClick={handleToggle} aria-label="Edit calendar">
                  <IconEdit size={22} />
                </Button>
                <Button
                  variant="transparent"
                  color="fail"
                  size="xs"
                  onClick={() => onDelete(id)}
                  aria-label="Delete calendar"
                >
                  <IconTrash size={22} />
                </Button>
              </>
            )}
          </div>
        </div>
        <Collapse in={isOpen}>
          <CalendarForm
            isEditMode={true}
            initialValues={{ label, color, type, isActive, url }}
            calendarId={id}
            onDelete={() => onDelete(id)}
          />
        </Collapse>
      </div>
    );
  }
);
