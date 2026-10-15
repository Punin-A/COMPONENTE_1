import { BookOpenText } from 'lucide-react';
import Navigation from './Navigation.jsx';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Páginas Abiertas, inicio">
            <span className="brand-mark" aria-hidden="true"><BookOpenText size={22} /></span>
            <span>Páginas Abiertas</span>
          </a>
          <Navigation />
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>Páginas Abiertas · Un espacio para compartir buenas lecturas.</p>
          <a href="/registro">Escribir una reseña</a>
        </div>
      </footer>
    </div>
  );
}
