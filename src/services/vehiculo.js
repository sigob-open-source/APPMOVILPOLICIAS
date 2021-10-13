// Dependencies
import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'recaudacion/vehiculos/';

const getVehiculos = async (params = {}) => {
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

const createVehiculo = async (numeroDePlaca = null, serie = null) => {
  try {
    const response = await HTTP.post(BASE_URL, {
      numero_de_placa: numeroDePlaca,
      serie,
    });

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    logger(error);
    logger(error?.response?.data);
  }
  return null;
};

export {
  getVehiculos,
  createVehiculo,
};
