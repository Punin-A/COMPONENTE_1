const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const details = data.errores ? Object.values(data.errores).join(' ') : '';
      throw new Error(details || data.mensaje || 'No fue posible completar la solicitud.');
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con la API. Verifica que el servidor esté activo.');
    }
    throw error;
  }
}

export function getReviews() {
  return request('/registros');
}

export function createReview(review) {
  return request('/registros', { method: 'POST', body: JSON.stringify(review) });
}
