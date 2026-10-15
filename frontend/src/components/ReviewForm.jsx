import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import Message from './Message.jsx';
import { createReview } from '../services/reviewsApi.js';
import { validateReview } from '../utils/validation.js';

const initialValues = {
  libro: '', nombre: '', email: '', descripcion: '', fecha: '', categoria: '',
};

const genres = ['Aventura', 'Biografía', 'Ciencia ficción', 'Clásico', 'Fantasía', 'Historia', 'Misterio', 'Poesía', 'Romance', 'Terror', 'Otro'];

export default function ReviewForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const maxDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
    if (status.message) setStatus({ type: '', message: '' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateReview(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus({ type: 'error', message: 'Revisa los campos señalados antes de enviar.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      await createReview(values);
      setValues(initialValues);
      setErrors({});
      setStatus({ type: 'success', message: 'Tu reseña fue publicada correctamente.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (name) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const describedBy = (name) => errors[name] ? `${name}-error` : undefined;

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <div className="field full-field">
        <label htmlFor="libro">Título del libro <span>*</span></label>
        <input id="libro" name="libro" value={values.libro} onChange={handleChange} placeholder="Ej. Cien años de soledad" maxLength="120" aria-invalid={Boolean(errors.libro)} aria-describedby={describedBy('libro')} />
        {fieldError('libro')}
      </div>

      <div className="field">
        <label htmlFor="nombre">Tu nombre <span>*</span></label>
        <input id="nombre" name="nombre" value={values.nombre} onChange={handleChange} placeholder="Nombre y apellido" maxLength="80" autoComplete="name" aria-invalid={Boolean(errors.nombre)} aria-describedby={describedBy('nombre')} />
        {fieldError('nombre')}
      </div>

      <div className="field">
        <label htmlFor="email">Correo electrónico <span>*</span></label>
        <input id="email" name="email" type="email" value={values.email} onChange={handleChange} placeholder="nombre@correo.com" maxLength="120" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />
        {fieldError('email')}
      </div>

      <div className="field">
        <label htmlFor="fecha">Fecha de lectura <span>*</span></label>
        <input id="fecha" name="fecha" type="date" value={values.fecha} onChange={handleChange} max={maxDate} aria-invalid={Boolean(errors.fecha)} aria-describedby={describedBy('fecha')} />
        {fieldError('fecha')}
      </div>

      <div className="field">
        <label htmlFor="categoria">Género literario <span>*</span></label>
        <select id="categoria" name="categoria" value={values.categoria} onChange={handleChange} aria-invalid={Boolean(errors.categoria)} aria-describedby={describedBy('categoria')}>
          <option value="">Selecciona un género</option>
          {genres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
        </select>
        {fieldError('categoria')}
      </div>

      <div className="field full-field">
        <div className="label-row">
          <label htmlFor="descripcion">Tu reseña <span>*</span></label>
          <small>{values.descripcion.length}/1000</small>
        </div>
        <textarea id="descripcion" name="descripcion" value={values.descripcion} onChange={handleChange} placeholder="¿Qué te hizo sentir? ¿A quién se lo recomendarías?" rows="6" maxLength="1000" aria-invalid={Boolean(errors.descripcion)} aria-describedby={describedBy('descripcion')} />
        {fieldError('descripcion')}
      </div>

      <div className="form-actions full-field">
        <p><span>*</span> Campos obligatorios</p>
        <button className="button primary-button" type="submit" disabled={submitting}>
          {submitting ? <span className="spinner" aria-hidden="true" /> : <Send size={18} />}
          {submitting ? 'Publicando…' : 'Publicar reseña'}
        </button>
      </div>
      {status.message && <div className="full-field"><Message type={status.type}>{status.message}</Message></div>}
    </form>
  );
}
