import { type ReactNode, forwardRef } from 'react';
import {
  Input,
  ColorPicker as MantineColorPicker,
  type ColorPickerProps as MantineColorPickerProps,
  useMantineTheme,
} from '@mantine/core';
import styles from './ColorPicker.module.sass';

type ColorPickerProps = Omit<MantineColorPickerProps, 'swatches'> & {
  swatches?: string[];
  label?: string;
  required?: boolean;
  error?: ReactNode;
  'aria-label'?: string;
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ swatches, label, required, error, 'aria-label': ariaLabel, ...props }, ref) => {
    const theme = useMantineTheme();

    const defaultSwatches = theme.colors.calendar.slice(0, 8);

    const colorPicker = (
      <MantineColorPicker
        ref={ref}
        classNames={{ swatches: styles.swatches, wrapper: styles.wrapper }}
        swatches={swatches || defaultSwatches}
        {...props}
      />
    );

    if (label) {
      return (
        <Input.Wrapper label={label} required={required} error={error} aria-label={ariaLabel}>
          {colorPicker}
        </Input.Wrapper>
      );
    }

    return colorPicker;
  }
);

ColorPicker.displayName = 'ColorPicker';
