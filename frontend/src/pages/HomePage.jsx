import { ArrowRight, BookOpen, Feather, LibraryBig } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Feather size={16} /> Comunidad de lectores</span>
            <h1>Cada libro deja una huella. <em>Comparte la tuya.</em></h1>
            <p>Un rincón sencillo para recomendar lecturas, descubrir nuevas historias y conocer lo que otros lectores tienen que decir.</p>
            <div className="hero-actions">
              <Link className="button primary-button" to="/registro">Escribir una reseña <ArrowRight size={18} /></Link>
              <Link className="button secondary-button" to="/lista">Explorar reseñas</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="quote-card">
              <span className="quote-mark">“</span>
              <p>Los libros son puertas hacia mundos que aún no conocemos.</p>
              <span className="scribble">leer · sentir · compartir</span>
            </div>
            <div className="book-stack"><i /><i /><i /><i /></div>
            <span className="floating-star star-one">✦</span>
            <span className="floating-star star-two">✧</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">Cómo funciona</span>
            <h2>Tu próxima lectura empieza aquí</h2>
          </div>
          <div className="steps-grid">
            <article><span className="step-icon"><BookOpen /></span><small>01</small><h3>Elige un libro</h3><p>Piensa en esa historia que todavía sigue contigo.</p></article>
            <article><span className="step-icon"><Feather /></span><small>02</small><h3>Cuenta tu experiencia</h3><p>Escribe una reseña honesta y útil para otros lectores.</p></article>
            <article><span className="step-icon"><LibraryBig /></span><small>03</small><h3>Inspira a alguien</h3><p>Tu opinión puede convertirse en la próxima gran lectura.</p></article>
          </div>
        </div>
      </section>
    </>
  );
}
