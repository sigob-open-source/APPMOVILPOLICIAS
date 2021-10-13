// Dependencies
import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'configuracion/uma/';

const getUmas = async () => {
  try {
    const response = await HTTP.get(BASE_URL);
    if (response.status === 200) {
      return response.data?.results ?? response.data;
    }
  } catch (error) {
    logger(error);
  }
  return [];
};

export {
  getUmas,
};
