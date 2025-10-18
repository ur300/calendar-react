import { type ReactNode } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ScreenSizeContext } from './screenSizeContext';

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  const { breakpoints } = theme;
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  return <ScreenSizeContext.Provider value={{ isDesktop, isMobile }}>{children}</ScreenSizeContext.Provider>;
};
