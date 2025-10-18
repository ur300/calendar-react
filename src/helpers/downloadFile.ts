import apiService from '@/services/api';

export const downloadFile = async (fileUrl: string, filePath: string) => {
  try {
    const response = await apiService.get<Blob>(fileUrl, { responseType: 'blob' });
    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filePath || 'download';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
