const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const allowedGenres = new Set(['Aventura', 'Biografía', 'Ciencia ficción', 'Clásico', 'Fantasía', 'Historia', 'Misterio', 'Poesía', 'Romance', 'Terror', 'Otro']);

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isRealIsoDate(value) {
  if (!isoDatePattern.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateRecord(input = {}) {
  const errors = {};
  const libro = cleanString(input.libro);
  const nombre = cleanString(input.nombre);
  const email = cleanString(input.email);
  const descripcion = cleanString(input.descripcion);
  const fecha = cleanString(input.fecha);
  const categoria = cleanString(input.categoria);

  if (!libro) errors.libro = 'El título del libro es obligatorio.';
  else if (libro.length > 120) errors.libro = 'El título no puede superar 120 caracteres.';
  if (!nombre) errors.nombre = 'El nombre es obligatorio.';
  else if (nombre.length > 80) errors.nombre = 'El nombre no puede superar 80 caracteres.';
  if (!email) errors.email = 'El correo electrónico es obligatorio.';
  else if (!emailPattern.test(email) || email.length > 120) errors.email = 'El correo electrónico no es válido.';
  if (!descripcion) errors.descripcion = 'La reseña es obligatoria.';
  else if (descripcion.length < 10 || descripcion.length > 1000) errors.descripcion = 'La reseña debe tener entre 10 y 1000 caracteres.';
  if (!fecha) errors.fecha = 'La fecha es obligatoria.';
  else if (!isRealIsoDate(fecha)) errors.fecha = 'La fecha no es válida.';
  else if (fecha > new Date().toISOString().slice(0, 10)) errors.fecha = 'La fecha no puede estar en el futuro.';
  if (!categoria) errors.categoria = 'El género es obligatorio.';
  else if (!allowedGenres.has(categoria)) errors.categoria = 'El género seleccionado no es válido.';
  return errors;
}

export function normalizeRecord(input) {
  return {
    libro: cleanString(input.libro),
    nombre: cleanString(input.nombre),
    email: cleanString(input.email).toLowerCase(),
    descripcion: cleanString(input.descripcion),
    fecha: cleanString(input.fecha),
    categoria: cleanString(input.categoria),
  };
}
