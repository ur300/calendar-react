import {
  type MantineSize,
  type VariantColorsResolver,
  defaultVariantColorsResolver,
  parseThemeColor,
} from '@mantine/core';
import styles from './../styles/exports.module.scss';
import type { ExtendedCustomColors } from '@/types';

const CUSTOM_COLORS_NAMES: Partial<Record<ExtendedCustomColors, string>> = {
  base: 'base',
  brand: 'brand',
  fail: 'fail',
  success: 'success',
  warn: 'warn',
};

export const getScaledValue = (value: string): string => `calc(${value} * var(--mantine-scale))`;

export const CONTROL_SIZES: Record<MantineSize, string> = {
  xs: getScaledValue(styles.controlSizeXS),
  sm: getScaledValue(styles.controlSizeSM),
  md: getScaledValue(styles.controlSizeMD),
  lg: getScaledValue(styles.controlSizeLG),
  xl: getScaledValue(styles.controlSizeXL),
};

export const CONTROL_SIZES_COMPACT: Record<MantineSize, string> = {
  xs: getScaledValue(styles.controlSizeCompactXS),
  sm: getScaledValue(styles.controlSizeCompactSM),
  md: getScaledValue(styles.controlSizeCompactMD),
  lg: getScaledValue(styles.controlSizeCompactLG),
  xl: getScaledValue(styles.controlSizeCompactXL),
};

export const PAGINATION_SIZES: Record<MantineSize, string> = {
  xs: getScaledValue('2rem'),
  sm: getScaledValue('2rem'),
  md: getScaledValue('2rem'),
  lg: getScaledValue('2.5rem'),
  xl: getScaledValue('2.5rem'),
};

export const getButtonFontSize = (size: MantineSize) => {
  switch (size) {
    case 'xs':
      return styles.fontSizeXS;
    case 'sm':
      return styles.fontSizeSM;
    case 'lg':
      return styles.fontSizeLG;
    case 'xl':
      return styles.fontSizeXL;

    default:
      return styles.fontSizeMD;
  }
};

export const getVariantColors = (background: string, hover: string, border: string, color: string) => ({
  background,
  hover,
  border: `1px solid ${border}`,
  color,
});

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  // Handle outline variant
  if (input.variant === 'outline') {
    if (parsedColor.color === CUSTOM_COLORS_NAMES['brand']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-0)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-6)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['success']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-0)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-6)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['warn']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-0)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-6)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['fail']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-0)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-6)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['base']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-0)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-6)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }
  }

  // Handle transparent variant
  if (input.variant === 'transparent') {
    if (parsedColor.color === CUSTOM_COLORS_NAMES['brand']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-0)`,
        border: 'none',
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-6)`,
        disabled: {
          background: 'transparent',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['success']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-0)`,
        border: 'none',
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-6)`,
        disabled: {
          background: 'transparent',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['warn']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-0)`,
        border: 'none',
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-6)`,
        disabled: {
          background: 'transparent',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['fail']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-0)`,
        border: 'none',
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-6)`,
        disabled: {
          background: 'transparent',
          color: '#ADB5BD',
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['base']) {
      return {
        ...defaultResolvedColors,
        background: 'transparent',
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-0)`,
        border: 'none',
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-6)`,
        disabled: {
          background: 'transparent',
          color: '#ADB5BD',
        },
      };
    }
  }

  if (input.variant === 'light') {
    if (parsedColor.color === CUSTOM_COLORS_NAMES['brand']) {
      return {
        ...defaultResolvedColors,
        ...getVariantColors(
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-0)`,
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-1)`,
          `transparent`,
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-6)`
        ),
        disabled: {
          background: '#E9ECEF', // Disabled background
          color: '#ADB5BD', // Disabled text
        },
      };
    } else if (parsedColor.color === CUSTOM_COLORS_NAMES['success']) {
      return {
        ...defaultResolvedColors,
        background: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-0)`,
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-1)`,
        border: `1px solid var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-5)`,
        color: `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-6)`,
        disabled: {
          background: 'transparent',
          border: '1px solid #ADB5BD',
          color: '#ADB5BD',
        },
      };
    }
  } else {
    // Default variant
    if (parsedColor.color === CUSTOM_COLORS_NAMES['brand']) {
      return {
        ...defaultResolvedColors,
        ...getVariantColors(
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-6)`,
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['brand']}-7)`,
          'none',
          '#fff'
        ),
        disabled: {
          background: '#E9ECEF', // Disabled background
          color: '#ADB5BD', // Disabled text
        },
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['success']) {
      return {
        ...defaultResolvedColors,
        ...getVariantColors(
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-6)`,
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['success']}-7)`,
          'none',
          '#fff'
        ),
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['warn']) {
      return {
        ...defaultResolvedColors,
        ...getVariantColors(
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-6)`,
          `var(--mantine-color-${CUSTOM_COLORS_NAMES['warn']}-7)`,
          'none',
          '#fff'
        ),
      };
    }

    if (parsedColor.color === CUSTOM_COLORS_NAMES['fail']) {
      return {
        ...defaultResolvedColors,
        background: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-6)`, // Default
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['fail']}-7)`, // Hover
        border: 'none',
        color: '#fff',
        disabled: {
          background: '#E9ECEF', // Disabled background
          color: '#ADB5BD', // Disabled text
        },
      };
    }
    if (parsedColor.color === CUSTOM_COLORS_NAMES['base']) {
      return {
        ...defaultResolvedColors,
        background: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-6)`, // Default
        hover: `var(--mantine-color-${CUSTOM_COLORS_NAMES['base']}-7)`, // Hover
        border: 'none',
        color: '#fff',
        disabled: {
          background: '#E9ECEF', // Disabled background
          color: '#ADB5BD', // Disabled text
        },
      };
    }
  }

  return defaultResolvedColors;
};
