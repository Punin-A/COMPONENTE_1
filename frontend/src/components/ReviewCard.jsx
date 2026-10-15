import { BookMarked, CalendarDays, UserRound } from 'lucide-react';

function formatDate(value) {
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="card-topline">
        <span className="genre-pill">{review.categoria}</span>
        <span className="card-date"><CalendarDays size={15} /> {formatDate(review.fecha)}</span>
      </div>
      <div className="book-heading">
        <span className="book-icon" aria-hidden="true"><BookMarked size={24} /></span>
        <h2>{review.libro}</h2>
      </div>
      <blockquote>“{review.descripcion}”</blockquote>
      <div className="reviewer">
        <span className="avatar" aria-hidden="true"><UserRound size={18} /></span>
        <div>
          <strong>{review.nombre}</strong>
          <span>{review.email}</span>
        </div>
      </div>
    </article>
  );
}
