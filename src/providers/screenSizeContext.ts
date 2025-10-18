import { createContext } from 'react';

type ScreenSizeContextType = {
  isDesktop: boolean | undefined;
  isMobile: boolean | undefined;
};

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export { ScreenSizeContext };
export type { ScreenSizeContextType };
