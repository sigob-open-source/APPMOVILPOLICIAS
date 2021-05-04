import { logger } from '../utils/logger';
import { HTTP } from './http';

const login = async (email, password) => {
  try {
    const response = await HTTP.post('usuarios/login/', {
      email,
      password,
    });
    return response?.data?.access ? response?.data : null;
  } catch (error) {
    logger('[login]', error);
  }
  return null;
};

export { login };
