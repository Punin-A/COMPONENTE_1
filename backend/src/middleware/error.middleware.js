export function notFoundHandler(request, response) {
  response.status(404).json({ mensaje: `Ruta no encontrada: ${request.method} ${request.originalUrl}` });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  response.status(status).json({
    mensaje: status === 500 ? 'Ocurrió un error al procesar los datos.' : error.message,
  });
}
