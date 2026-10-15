import { Link } from 'react-router-dom';
import { ArrowLeft, List } from 'lucide-react';
import ReviewForm from '../components/ReviewForm.jsx';

export default function RegistrationPage() {
  return (
    <section className="page-section paper-bg">
      <div className="container narrow-container">
        <Link className="back-link" to="/"><ArrowLeft size={17} /> Volver al inicio</Link>
        <div className="page-intro">
          <span className="kicker">Comparte tu lectura</span>
          <h1>Escribe una reseña</h1>
          <p>Cuéntanos qué libro leíste y por qué merece —o no— un lugar en otra biblioteca.</p>
        </div>
        <div className="form-card">
          <ReviewForm />
        </div>
        <div className="under-form">
          <span>¿Quieres saber qué están leyendo los demás?</span>
          <Link to="/lista"><List size={17} /> Ver todas las reseñas</Link>
        </div>
      </div>
    </section>
  );
}
