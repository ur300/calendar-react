import { FORMAT_DATE } from '@/constants';
import { format } from '@/utils/dayjs';

export const formatDateDetails = (startDate: string | Date, endDate: string | Date) => {
  const startDateFormatted = format(startDate, FORMAT_DATE);
  const endDateFormatted = format(endDate, FORMAT_DATE);
  if (startDateFormatted === endDateFormatted) return startDateFormatted;
  return `${startDateFormatted} - ${endDateFormatted}`;
};
