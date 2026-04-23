import { useNavigate, useLocation, Link } from 'react-router-dom';

const menu = [
  { label: '🏠 Home',               path: '/home' },
  { label: '🌡️ Temperatura',       path: '/sensores/temperatura' },
  { label: '💧 Umidade',            path: '/sensores/umidade' },
  { label: '💡 Luminosidade',       path: '/sensores/luminosidade' },
  { label: '🔢 Contador',           path: '/sensores/contador' },
  { divider: true },
  { label: '📟 Sensores',           path: '/crud/sensores' },
  { label: '🖥️ Microcontroladores', path: '/crud/microcontroladores' },
  { label: '🏢 Ambientes',          path: '/crud/ambientes' },
  { label: '📍 Locais',             path: '/crud/locais' },
  { label: '👤 Responsáveis',       path: '/crud/responsaveis' },
  { label: '👥 Usuários',           path: '/crud/usuarios' },
  { label: '📊 Medições',           path: '/crud/historicos' },
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
        {/* Linha neon no topo */}
        <div style={s.neonTop} />

        {/* Logo */}
        <div style={s.logoWrap}>
          <div style={s.logoMark}>⚡</div>
          <div>
            <div style={s.logoName}>SmartSENAI</div>
            <div style={s.logoSub}>Monitoramento</div>
          </div>
        </div>

        <div style={s.divider} />

        <nav style={s.nav}>
          {menu.map((item, i) =>
            item.divider
              ? <div key={i} style={s.menuDivider} />
              : (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ ...s.navItem, ...(pathname === item.path ? s.navActive : {}) }}
                >
                  {item.label}
                </Link>
              )
          )}
        </nav>

        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 0.75rem 1rem' }}>
          <button onClick={logout} style={s.logoutBtn}>⏻ Sair</button>
        </div>
      </aside>

      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  shell: { display: 'flex', minHeight: '100vh', background: 'var(--bg-deep)' },
  sidebar: {
    width: 228,
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRight: '1px solid rgba(255,255,255,0.09)',
    display: 'flex', flexDirection: 'column',
    position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    boxShadow: '2px 0 24px rgba(0,0,0,0.3)',
  },
  neonTop: {
    height: 3,
    background: 'linear-gradient(90deg, #00CFFF, #0057B8, #00CFFF)',
    backgroundSize: '200% 100%',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 10, padding: '1.2rem 1rem 1rem' },
  logoMark: {
    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
    background: 'linear-gradient(135deg, #00CFFF, #0057B8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 17, boxShadow: '0 0 12px rgba(0,207,255,0.4)',
  },
  logoName: { fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.2 },
  logoSub:  { fontSize: 10, color: 'var(--muted)', marginTop: 1 },
  divider:  { height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0.75rem 0.5rem' },
  nav:      { display: 'flex', flexDirection: 'column', padding: '0 0.5rem' },
  navItem: {
    padding: '0.48rem 0.75rem', color: 'var(--muted)', fontSize: 13,
    borderRadius: 7, display: 'block', transition: 'all .12s',
    borderLeft: '2px solid transparent', marginBottom: 1, fontWeight: 500,
  },
  navActive: {
    color: 'var(--cyan)',
    borderLeftColor: 'var(--cyan)',
    background: 'rgba(0,207,255,0.09)',
    fontWeight: 600,
    textShadow: '0 0 8px rgba(0,207,255,0.3)',
  },
  menuDivider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '0.4rem 0.25rem' },
  main: { flex: 1, minWidth: 0 },
  logoutBtn: {
    width: '100%', padding: '0.48rem',
    background: 'rgba(255,107,122,0.1)',
    border: '1px solid rgba(255,107,122,0.3)',
    color: 'var(--danger)',
    borderRadius: 'var(--radius)', fontSize: 13, fontWeight: 600,
    transition: 'all .12s', fontFamily: 'var(--font-head)',
  },
};
