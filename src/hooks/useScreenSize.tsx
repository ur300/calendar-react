import { useContext } from 'react';
import { ScreenSizeContext, type ScreenSizeContextType } from '@/providers/screenSizeContext';

export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};
