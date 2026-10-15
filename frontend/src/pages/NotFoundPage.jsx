import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="page-section"><div className="container state-card"><span className="error-code">404</span><h1>Página no encontrada</h1><p>Esta página parece haberse quedado entre capítulos.</p><Link className="button primary-button" to="/">Volver al inicio</Link></div></section>;
}
