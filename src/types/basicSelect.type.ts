import type { ComboboxProps, InputBaseProps } from '@mantine/core';
import type { ExtendedCustomColors } from '@/types';
import type { ReactNode } from 'react';

export type BasicSelectOption = {
  value: string;
  label: ReactNode;
  leftSection?: ReactNode;
};

export type BasicSelectProps = {
  value: string | null;
  options: BasicSelectOption[];
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  label?: ReactNode;
  required?: boolean;
  error?: ReactNode;
  onChange: (value: string) => void;
  placeholder?: string;
  color?: ExtendedCustomColors;
  withShadow?: boolean;
  wrapperClassName?: string;
  buttonProps: InputBaseProps;
} & Omit<ComboboxProps, 'children' | 'store' | 'onOptionSubmit'>;
