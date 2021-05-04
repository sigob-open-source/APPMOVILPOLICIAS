// Dependencies
import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'recaudacion/';

const createCargo = async (tipoDeCargo, importe, vehiculo) => {
  try {
    const response = await HTTP.post(`${BASE_URL}generar-cargos/`, {
      tipo_de_cargo: tipoDeCargo,
      padron_id: vehiculo,
      importe,
      padron: 4,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    logger('[createCargo]', error);
    logger('[createCargo]', error?.response?.data);
  }
  return null;
};

const calcularCargo = async (tipoDeCargo, importe, vehiculo) => {
  try {
    const response = await HTTP.post(`${BASE_URL}calculo-cargos/`, {
      tipo_de_cargo: tipoDeCargo,
      importe,
      padron_id: vehiculo,
      padron: 4,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    logger('[calcularCargo]', error);
    logger('[calcularCargo]', error?.response?.data);
  }
  return null;
};

export {
  createCargo,
  calcularCargo,
};
