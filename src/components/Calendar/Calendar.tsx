import { CalendarDesktop } from './CalendarDesktop';
import { CalendarMobile } from './CalendarMobile/CalendarMobile';
import { useScreenSize } from '@/hooks';
import type { CalendarProps } from '@/types';

export const Calendar = (props: CalendarProps) => {
  const { isMobile } = useScreenSize();
  return isMobile ? <CalendarMobile {...props} /> : <CalendarDesktop {...props} />;
};
