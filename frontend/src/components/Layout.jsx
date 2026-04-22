import { useNavigate, useLocation, Link } from 'react-router-dom';

const menu = [
  { label: '🏠 Home',              path: '/home' },
  { label: '🌡️ Temperatura',      path: '/sensores/temperatura' },
  { label: '💧 Umidade',           path: '/sensores/umidade' },
  { label: '💡 Luminosidade',      path: '/sensores/luminosidade' },
  { label: '🔢 Contador',          path: '/sensores/contador' },
  { divider: true },
  { label: '📟 Sensores',          path: '/crud/sensores' },
  { label: '🖥️ Microcontroladores',path: '/crud/microcontroladores' },
  { label: '🏢 Ambientes',         path: '/crud/ambientes' },
  { label: '📍 Locais',            path: '/crud/locais' },
  { label: '👤 Responsáveis',      path: '/crud/responsaveis' },
  { label: '👥 Usuários',          path: '/crud/usuarios' },
  { label: '📊 Medições',          path: '/crud/historicos' },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={s.shell}>
      <aside style={s.sidebar}>
        <div style={s.logo}>
          <span style={s.logoIcon}>⚡</span>
          <span style={s.logoText}>TecnoVille</span>
        </div>
        <nav style={s.nav}>
          {menu.map((item, i) =>
            item.divider
              ? <div key={i} style={s.divider} />
              : (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...s.navItem,
                    ...(pathname === item.path ? s.navActive : {}),
                  }}
                >
                  {item.label}
                </Link>
              )
          )}
        </nav>
        <button onClick={logout} style={s.logoutBtn}>⏻ Sair</button>
      </aside>
      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  shell:    { display: 'flex', minHeight: '100vh' },
  sidebar:  { width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '1.5rem 0', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  logo:     { display: 'flex', alignItems: 'center', gap: 8, padding: '0 1.2rem', marginBottom: '1.5rem' },
  logoIcon: { fontSize: 22, color: 'var(--accent)' },
  logoText: { fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 18, color: 'var(--text)', letterSpacing: 1 },
  nav:      { display: 'flex', flexDirection: 'column', flex: 1 },
  navItem:  { padding: '0.55rem 1.2rem', color: 'var(--muted)', fontSize: 13, transition: 'all .15s', borderLeft: '3px solid transparent', display: 'block' },
  navActive:{ color: 'var(--accent)', borderLeftColor: 'var(--accent)', background: 'rgba(0,229,255,0.06)' },
  divider:  { height: 1, background: 'var(--border)', margin: '0.5rem 1.2rem' },
  logoutBtn:{ margin: '1rem 1.2rem 0', padding: '0.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--danger)', borderRadius: 'var(--radius)', fontSize: 13, transition: 'all .15s' },
};
