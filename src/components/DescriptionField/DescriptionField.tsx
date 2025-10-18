import { Textarea, type TextareaProps } from '@mantine/core';
import { MAX_DESCRIPTION_LENGTH } from '@/constants';
import styles from './DescriptionField.module.sass';

type DescriptionFieldProps = Omit<TextareaProps, 'description'>;

export const DescriptionField = ({
  value = '',
  label = 'Description',
  placeholder = 'Description',
  required = false,
  'aria-label': ariaLabel = 'Description',
  error,
  maxLength,
  ...props
}: DescriptionFieldProps) => {
  const stringValue = String(value || '');
  const descriptionLength = stringValue.length;

  return (
    <Textarea
      value={value}
      label={label}
      placeholder={placeholder}
      maxLength={maxLength ?? MAX_DESCRIPTION_LENGTH}
      required={required}
      description={error ? undefined : `${descriptionLength}/${maxLength ?? MAX_DESCRIPTION_LENGTH}`}
      error={error}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      aria-label={ariaLabel}
      classNames={{
        description: styles.rightAlignedDescription,
      }}
      {...props}
    />
  );
};
