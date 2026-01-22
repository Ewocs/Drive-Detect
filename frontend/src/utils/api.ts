// API configuration utilities
export const getApiBaseUrl = (): string => {
  const saved = localStorage.getItem('drivedetect-api-endpoint');
  return saved || 'http://127.0.0.1:8000';
};

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
};