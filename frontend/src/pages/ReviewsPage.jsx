import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, BookOpenText, Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Message from '../components/Message.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { getReviews } from '../services/reviewsApi.js';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setReviews(await getReviews());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  return (
    <section className="page-section paper-bg">
      <div className="container">
        <Link className="back-link" to="/"><ArrowLeft size={17} /> Volver al inicio</Link>
        <div className="list-header">
          <div className="page-intro left-aligned">
            <span className="kicker">Biblioteca compartida</span>
            <h1>Reseñas de lectores</h1>
            <p>Explora opiniones reales y encuentra tu próxima historia.</p>
          </div>
          <Link className="button primary-button" to="/registro"><Plus size={18} /> Nueva reseña</Link>
        </div>

        {loading && (
          <div className="state-card" role="status"><span className="large-spinner" /><h2>Abriendo la biblioteca…</h2><p>Estamos buscando las reseñas más recientes.</p></div>
        )}
        {!loading && error && (
          <div className="state-card"><Message type="error">{error}</Message><button className="button secondary-button" onClick={loadReviews}><RefreshCw size={17} /> Reintentar</button></div>
        )}
        {!loading && !error && reviews.length === 0 && (
          <div className="state-card empty-state"><span className="empty-icon"><BookOpenText /></span><h2>Aún no hay reseñas</h2><p>Sé la primera persona en compartir una lectura con la comunidad.</p><Link className="button primary-button" to="/registro">Publicar la primera</Link></div>
        )}
        {!loading && !error && reviews.length > 0 && (
          <>
            <p className="result-count">{reviews.length} {reviews.length === 1 ? 'reseña publicada' : 'reseñas publicadas'}</p>
            <div className="reviews-grid">{reviews.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
          </>
        )}
      </div>
    </section>
  );
}
