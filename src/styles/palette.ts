import { DEFAULT_THEME, type MantineColorsTuple } from '@mantine/core';
const { colors } = DEFAULT_THEME;

export const paletteColorBrand: MantineColorsTuple = [
  '#eef4fb',
  '#e0ebfa',
  '#bfd5f2',
  '#6da7f3',
  '#4b93f2',
  '#2173de',
  '#1c69ce',
  '#125ab2',
  '#124187',
  '#0c3366',
];

export const paletteColorBase: MantineColorsTuple = [
  '#f9fafc',
  '#f3f4f7',
  '#e5e7ed',
  '#d0d4dd',
  '#98a2b3',
  '#657084',
  '#475368',
  '#334055',
  '#192231',
  '#111727',
];

export const paletteColorSuccess: MantineColorsTuple = [
  '#e8fdea',
  '#d5f6d8',
  '#95ea9c',
  '#64d86e',
  '#41c84d',
  '#1eb32b',
  '#14991f',
  '#137213',
  '#045804',
  '#074b07',
];

export const paletteColorWarn: MantineColorsTuple = [
  '#fff7f0',
  '#fff2e5',
  '#ffd6ad',
  '#ffba6b',
  '#ffa238',
  '#f8860d',
  '#de710b',
  '#b04c09',
  '#913c0a',
  '#733009',
];

export const paletteColorFail: MantineColorsTuple = [
  '#fef3f2',
  '#feedeb',
  '#fddfdd',
  '#fda29b',
  '#f97066',
  '#e5443e',
  '#d12b1f',
  '#b5201a',
  '#9c1b10',
  '#661c13',
];

export const paletteColorCalendar: MantineColorsTuple = [
  paletteColorBrand[6],
  colors.pink[5], //pink
  colors.grape[5], //purple
  colors.violet[5], //violet
  colors.cyan[5], //cyan
  colors.red[5], //red
  colors.lime[3], //lime
  colors.yellow[5], //yellow
  '',
  '',
];

export const paletteColorCalendarEvents: MantineColorsTuple = [
  '#E0EBFA', //blue
  '#FDF2FA', //pink
  '#ffdeeb', //purple
  '#f3f0ff', //violet
  '#e3fafc', //cyan
  '#fff5f5', //red
  '#F8FEE7', //lime
  '#fff9db', //yellow
  '',
  '',
];

export const paletteColorCalendarText: MantineColorsTuple = [
  '#1C69CE', //blue
  '#ED36B6', //pink
  '#ae3ec9', //purple
  '#7839EE', //violet
  '#0c8599', //cyan
  '#e03131', //red
  '#5c940d', //lime
  '#f08c00', //yellow
  '',
  '',
];
