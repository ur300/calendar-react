import { ErrorCode } from 'react-dropzone';
import i18next from 'i18next';

export const getFileUploadErrorMessage = (
  errorCode: ErrorCode | string,
  maxSize: number,
  minWidth?: number,
  minHeight?: number
): string => {
  const maxSizeMB = Math.round(maxSize / (1024 * 1024));

  switch (errorCode) {
    case ErrorCode.FileTooLarge:
      return i18next.t('fileUpload.fileTooLarge', { maxSizeMB, ns: 'global' });
    case ErrorCode.FileTooSmall:
      return i18next.t('fileUpload.fileTooSmall', { minWidth, minHeight, ns: 'global' });
    case ErrorCode.FileInvalidType:
      return i18next.t('fileUpload.fileInvalidType', { ns: 'global' });
    case ErrorCode.TooManyFiles:
      return i18next.t('fileUpload.tooManyFiles', { ns: 'global' });
    default:
      return '';
  }
};
