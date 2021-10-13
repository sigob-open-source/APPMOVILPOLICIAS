// Dependencies
import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'recaudacion/tipos-de-cargo/';

const getCargos = async (params = {}) => {
  try {
    const response = await HTTP.get(BASE_URL, {
      params: {
        ...params,
        padron: 4,
        tipo_de_aplicacion: 2,
      },
    });

    if (response.status === 200) {
      return response.data?.results ?? response.data;
    }
  } catch (error) {
    logger(error);
    logger(error?.response?.data);
  }
  return [];
};

export {
  getCargos,
};
