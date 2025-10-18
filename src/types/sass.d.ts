import { type DefaultMantineColor, type MantineColorsTuple } from '@mantine/core';
import type { ExtendedCustomColors } from './extended-custom-colors';

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
