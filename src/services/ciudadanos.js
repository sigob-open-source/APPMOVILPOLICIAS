// Dependencies
import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'cuentaunicasir/ciudadanos/';

const getCiudadanos = async (params = {}) => {
  try {
    const response = await HTTP.get(BASE_URL, {
      params,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    logger(error);
    logger(error?.response?.data);
  }
  return [];
};

export {
  getCiudadanos,
};
