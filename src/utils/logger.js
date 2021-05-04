/**
 * Condiciona acción de console.log para solo imprimir en desarrollo.
 * @param  {...any} params any
 */
const logger = (...params) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...params);
  }
};

export {
  logger,
};
