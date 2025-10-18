import {
  Button,
  type CSSVariablesResolver,
  type MantineSize,
  type MantineTheme,
  type MantineThemeOverride,
  Tabs,
  type TitleProps,
  rem,
} from '@mantine/core';
import tabsStyles from './tabs.module.sass';
import switchStyles from './switch.module.sass';
import formStyles from './form.module.sass';
import styles from './exports.module.scss';
import {
  CONTROL_SIZES,
  CONTROL_SIZES_COMPACT,
  PAGINATION_SIZES,
  getButtonFontSize,
  getScaledValue,
  variantColorResolver,
} from '@/utils/theme';
import {
  paletteColorBase,
  paletteColorBrand,
  paletteColorCalendar,
  paletteColorCalendarEvents,
  paletteColorFail,
  paletteColorSuccess,
  paletteColorWarn,
} from './palette';
import type { ExtendedCustomColors } from '@/types';
import { FORMAT_EDIT_DATE } from '@/constants';

const DEFAULT_SIZE: MantineSize = 'md';

const CALCULATED_CONTROL_SIZE = CONTROL_SIZES.md;

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-text': paletteColorBase[9],
  },
  dark: {},
});

export const ALL_COLORS: ExtendedCustomColors[] = ['brand', 'base', 'success', 'fail', 'warn'];

export const theme: MantineThemeOverride = {
  primaryColor: 'brand',
  fontFamily: 'Lato, sans-serif',
  variantColorResolver,
  colors: {
    brand: paletteColorBrand,
    fail: paletteColorFail,
    base: paletteColorBase,
    success: paletteColorSuccess,
    warn: paletteColorWarn,
    calendar: paletteColorCalendar,
    calendarEvents: paletteColorCalendarEvents,
  },
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  shadows: {
    // xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: `
      0px 1px 3px 0px rgba(17, 23, 39, 0.051),
      0px 10px 15px -5px rgba(17, 23, 39, 0.102),
      0px 7px 7px -5px rgba(17, 23, 39, 0.0392)
    `,
    // md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    // lg: '0 10px 15px rgba(0, 0, 0, 0.15)',
    // xl: '0 20px 25px rgba(0, 0, 0, 0.2)',
  },

  headings: {
    fontFamily: styles.fontFamilyTitle,
    sizes: {
      h1: { fontSize: '1.5rem', lineHeight: '1.334', fontWeight: '500' },
      h2: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '500' },
      h3: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '700' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.45' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  components: {
    Slider: {
      styles: {
        bar: {
          backgroundColor: paletteColorBrand[6],
        },
        thumb: {
          borderColor: paletteColorBrand[6],
        },
      },
    },
    AppShell: {
      styles: {
        root: {
          backgroundColor: styles.colorBg,
        },
      },
    },
    Avatar: {
      defaultProps: {
        size: DEFAULT_SIZE,
      },
      styles: {
        root: {
          '--avatar-size-xs': CONTROL_SIZES.xs,
          '--avatar-size-sm': CONTROL_SIZES.sm,
          '--avatar-size-md': CONTROL_SIZES.md,
          '--avatar-size-lg': CONTROL_SIZES.lg,
          '--avatar-size-xl': CONTROL_SIZES.xl,
        },
      },
    },
    TextInput: {
      classNames: formStyles,
      styles: {
        wrapper: {
          '--input-height-xs': CONTROL_SIZES.xs,
          '--input-height-sm': CONTROL_SIZES.sm,
          '--input-height-md': CONTROL_SIZES.md,
          '--input-height-lg': CONTROL_SIZES.lg,
          '--input-height-xl': CONTROL_SIZES.xl,
        },
      },
    },
    Input: {
      classNames: formStyles,
      styles: {
        wrapper: {
          '--input-height-xs': CONTROL_SIZES.xs,
          '--input-height-sm': CONTROL_SIZES.sm,
          '--input-height-md': CONTROL_SIZES.md,
          '--input-height-lg': CONTROL_SIZES.lg,
          '--input-height-xl': CONTROL_SIZES.xl,
        },
      },
    },
    InputWrapper: {
      classNames: formStyles,
    },
    InputBase: {
      classNames: formStyles,
      styles: (_: unknown, params: { color?: string }) => {
        const borderColor = params.color ? `var(--mantine-color-${params.color}-6)` : undefined;
        const textColor = params.color ? `var(--mantine-color-${params.color}-6)` : undefined;

        return {
          input: {
            borderColor,
            color: textColor,
          },
          section: {
            color: textColor,
          },
        };
      },
    },
    Textarea: {
      classNames: formStyles,
      styles: {
        wrapper: {
          '--input-height-xs': CONTROL_SIZES.xs,
          '--input-height-sm': CONTROL_SIZES.sm,
          '--input-height-md': CONTROL_SIZES.md,
          '--input-height-lg': CONTROL_SIZES.lg,
          '--input-height-xl': CONTROL_SIZES.xl,
        },
      },
    },
    MultiSelect: {
      styles: {
        // Стили для отдельной «пилюли»
        pill: {
          backgroundColor: paletteColorBrand[1],
          border: `1px solid ${paletteColorBrand[6]}`,
          color: paletteColorBrand[6],
        },

        // Стили для иконки (крестика)
        pillRemove: {
          color: paletteColorBrand[6],
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#1D4ED8',
          },
        },

        // Контейнер списка выбранных значений
        pillsList: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '12px',
        },
      },
    },
    Checkbox: {
      defaultProps: {
        size: DEFAULT_SIZE,
      },
      styles: {
        root: {
          '--checkbox-size-xs': styles.checkboxSizeXS,
          '--checkbox-size-sm': styles.checkboxSizeSM,
          '--checkbox-size-md': styles.checkboxSizeMD,
          '--checkbox-size-lg': styles.checkboxSizeLG,
          '--checkbox-size-xl': styles.checkboxSizeXL,
          '--checkbox-radius': getScaledValue('0.25rem'), // 4px
        },
      },
    },
    Button: Button.extend({
      defaultProps: {
        size: DEFAULT_SIZE,
      },
      vars: (_, props) => {
        const { size = DEFAULT_SIZE } = props;
        return {
          root: {
            '--button-fz': getButtonFontSize(size as MantineSize),
          },
        };
      },
      styles: {
        root: {
          fontWeight: styles.fontWeightMedium,
          '--button-height-xs': CONTROL_SIZES.xs,
          '--button-height-sm': CONTROL_SIZES.sm,
          '--button-height-md': CONTROL_SIZES.md,
          '--button-height-lg': CONTROL_SIZES.lg,
          '--button-height-xl': CONTROL_SIZES.xl,
          '--button-height-compact-sm': CONTROL_SIZES_COMPACT.sm,
          '--button-height-compact-md': CONTROL_SIZES_COMPACT.md,
          '--button-height-compact-lg': CONTROL_SIZES_COMPACT.lg,
          '--button-height-compact-xl': CONTROL_SIZES_COMPACT.xl,
          '--button-padding-x': getScaledValue('1rem'),
          '--button-padding-x-xs': getScaledValue('1rem'),
          '--button-padding-x-sm': getScaledValue('1rem'),
          '--button-padding-x-md': getScaledValue('1rem'),
          '--button-padding-x-lg': getScaledValue('1rem'),
          '--button-padding-x-xl': getScaledValue('1rem'),
          '--button-padding-x-compact-xs': getScaledValue('1rem'),
          '--button-padding-x-compact-sm': getScaledValue('1rem'),
          '--button-padding-x-compact-md': getScaledValue('1rem'),
          '--button-padding-x-compact-lg': getScaledValue('1rem'),
          '--button-padding-x-compact-xl': getScaledValue('1rem'),
          '--button-radius': 'var(--mantine-radius-xl)',
        },
      },
    }),
    Tabs: Tabs.extend({
      classNames: tabsStyles,
    }),
    Title: {
      styles: (theme: MantineTheme, params: TitleProps) => ({
        root: {
          fontWeight: 600,
          fontFamily: styles.fontFamilyAccent,
          color: theme.colors.base[10],
          marginBottom: rem(8),

          ...(params.order === 1 && {
            fontSize: rem(72),
            lineHeight: rem(90),
          }),
          ...(params.order === 2 && {
            fontSize: rem(60),
            lineHeight: rem(72),
          }),
          ...(params.order === 3 && {
            fontSize: rem(48),
            lineHeight: rem(60),
          }),
          ...(params.order === 4 && {
            fontSize: rem(36),
            lineHeight: rem(44),
          }),
          ...(params.order === 5 && {
            fontSize: rem(30),
            lineHeight: rem(38),
          }),
          ...(params.order === 6 && {
            fontSize: rem(24),
            lineHeight: rem(32),
          }),
        },
      }),
    },
    Badge: {
      styles: {
        root: {
          margin: 0,
        },
      },
    },
    Modal: {
      styles: {
        inner: {
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          fontSize: '1.125rem', // 18px
          fontWeight: styles.fontWeightSemibold,
          flex: 1,
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        size: '',
      },
      styles: {
        root: {
          '--ai-size-xs': CONTROL_SIZES.xs,
          '--ai-size-sm': CONTROL_SIZES.sm,
          '--ai-size-md': CONTROL_SIZES.md,
          '--ai-size-lg': CONTROL_SIZES.lg,
          '--ai-size-xl': CALCULATED_CONTROL_SIZE,
        },
      },
    },
    Switch: {
      classNames: switchStyles,
    },
    FileInput: {
      styles: {
        input: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
        placeholder: {
          color: paletteColorBase[6],
        },
      },
    },
    Menu: {
      styles: {
        item: {
          padding: `${getScaledValue('0.5rem')} ${getScaledValue('0.75rem')}`, // 16px 12px
        },
      },
    },
    DatePickerInput: {
      defaultProps: {
        valueFormat: FORMAT_EDIT_DATE,
        placeholder: FORMAT_EDIT_DATE,
      },
    },
    Table: {
      styles: {
        table: {
          border: 'none',
          borderCollapse: 'collapse',
          '--table-border-color': 'var(--mantine-color-gray-3)',
        },
        thead: {
          backgroundColor: paletteColorBase[1],
        },
        th: {
          fontWeight: 'bold',
          fontSize: '0.875rem', // 14px
          padding: styles.tableCellPadding,
          // border: '1px solid var(--table-border-color)',
          // borderTop: 'none',
          // borderLeft: 'none',
        },
        td: {
          backgroundColor: '#fff',
          padding: styles.tableCellPadding,
          // borderTopWidth: '1px',
          // borderTop: 'none',
          // borderLeft: 'none',
        },
      },
    },
    Text: {
      defaultProps: {
        size: DEFAULT_SIZE,
      },
      styles: (_: unknown, params: { size: MantineSize }) => {
        const currentSize = params.size || 'md';

        let fontSize;
        let lineHeight;

        switch (currentSize) {
          case 'xs':
            fontSize = rem(12);
            lineHeight = rem(18);
            break;

          case 'sm':
            fontSize = rem(14);
            lineHeight = rem(20);
            break;

          case 'md':
            fontSize = rem(16);
            lineHeight = rem(24);
            break;

          case 'lg':
            fontSize = rem(18);
            lineHeight = rem(28);
            break;

          case 'xl':
            fontSize = rem(20);
            lineHeight = rem(30);
            break;

          default:
            fontSize = '1rem';
            lineHeight = '1.5';
        }

        return {
          root: {
            fontSize,
            lineHeight,
          },
        };
      },
    },
    Pagination: {
      defaultProps: {
        size: DEFAULT_SIZE,
      },
      styles: (_: unknown, params: { size: MantineSize }) => {
        const paddingMap = {
          xs: getScaledValue('0.75rem'),
          sm: getScaledValue('0.75rem'),
          md: getScaledValue('0.75rem'),
          lg: getScaledValue('1rem'),
          xl: getScaledValue('1rem'),
        };

        const currentSize: string = PAGINATION_SIZES[params.size || 'md'];
        const currentPadding: string = paddingMap[params.size || 'md'];

        return {
          control: {
            height: currentSize,
            minWidth: currentSize,
            fontSize: '1rem',
            paddingLeft: currentPadding,
            paddingRight: currentPadding,
          },
          icon: {
            width: '1rem',
            height: '1rem',
          },
          controlIcon: {
            width: '1rem',
            height: '1rem',
          },
        };
      },
    },
    ColorPicker: {
      styles: {
        root: {},
      },
    },
    ColorSwatch: {
      vars: () => ({
        root: {
          '--cs-radius': '50%',
        },
      }),
    },
  },
  defaultRadius: DEFAULT_SIZE,
  spacing: {
    xs: styles.spacingXS,
    sm: styles.spacingSM,
    md: styles.spacingMD,
    lg: styles.spacingLG,
    xl: styles.spacingXL,
    xxl: styles.spacingXXL,
    basic: styles.spacingBasic,
  },
  breakpoints: {
    xs: styles.breakpointXS,
    sm: styles.breakpointSM,
    md: styles.breakpointMD,
    lg: styles.breakpointLG,
    xl: styles.breakpointXL,
  },
};
