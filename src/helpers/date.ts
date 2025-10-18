import { FORMAT_DATE, FORMAT_DATE_TIME } from '@/constants';
import dayjs from 'dayjs';

export const printDateAndTime = (dateStr: string | undefined | null) => {
  if (!dateStr) {
    return '';
  }

  return dayjs(dateStr).format(FORMAT_DATE_TIME);
};

export const printDate = (dateStr: string | undefined | null) => {
  if (!dateStr) {
    return '';
  }

  return dayjs(dateStr).format(FORMAT_DATE);
};
