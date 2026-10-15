import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/registro', label: 'Publicar' },
  { to: '/lista', label: 'Explorar' },
];

export default function Navigation() {
  return (
    <nav className="main-nav" aria-label="Navegación principal">
      {links.map(({ to, label }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
