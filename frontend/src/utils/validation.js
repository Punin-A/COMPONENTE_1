const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export function validateReview(values) {
  const errors = {};
  if (!values.libro.trim()) errors.libro = 'Escribe el título del libro.';
  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre.';
  if (!values.email.trim()) errors.email = 'Escribe tu correo electrónico.';
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Ingresa un correo electrónico válido.';
  if (!values.descripcion.trim()) errors.descripcion = 'Escribe una breve reseña.';
  else if (values.descripcion.trim().length < 10) errors.descripcion = 'La reseña debe tener al menos 10 caracteres.';
  if (!values.fecha) errors.fecha = 'Selecciona la fecha de lectura.';
  else if (!isoDatePattern.test(values.fecha) || Number.isNaN(Date.parse(`${values.fecha}T00:00:00Z`))) errors.fecha = 'Selecciona una fecha válida.';
  else if (values.fecha > new Date().toISOString().slice(0, 10)) errors.fecha = 'La fecha no puede estar en el futuro.';
  if (!values.categoria) errors.categoria = 'Selecciona un género literario.';
  return errors;
}
