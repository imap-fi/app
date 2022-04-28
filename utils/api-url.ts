export const API_URL = (endpoint?: string) => {
  if (!process.env.API_URL) {
    throw new Error('API_URL is not defined');
  }

  if (endpoint) {
    return `${process.env.API_URL}/${endpoint}`;
  } else {
    return process.env.API_URL;
  }
};
