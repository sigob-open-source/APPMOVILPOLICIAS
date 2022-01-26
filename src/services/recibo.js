import { logger } from '../utils/logger';
import { HTTP } from './http';

const BASE_URL = 'recaudacion/recibos/';

const generarPago = async (vehiculo, cargos, importe) => {
  try {
    console.log('mostrando importe');
    console.log(importe);
    const response = await HTTP.post(BASE_URL, {
      padrones: [
        {
          padron_id: vehiculo,
          tipo_de_padron: 4,
          cargos,
        },
      ],
      metodos_de_pago: [
        {
          metodo: 4,
          importe,
          sucursal: 1,
          numero_de_transaccion: 1,
          clabe_interbancaria: '1234567890',
          numero_de_cuenta: '1234567890',
          banco: 1,
        },
      ],
      ciudadano: 1,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    logger(error);
    logger(JSON.stringify(error?.response.data, null, 2));
  }
  return null;
};

export {
  generarPago,
};
