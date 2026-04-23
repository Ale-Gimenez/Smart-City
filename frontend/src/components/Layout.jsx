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
        {/* Logo */}
        <div style={s.logoWrap}>
          <div style={s.logoMark}>
            <span style={s.logoIcon}>⚡</span>
          </div>
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

        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 0.75rem 1rem' }}>
          <button onClick={logout} style={s.logoutBtn}>
            ⏻ Sair
          </button>
        </div>
      </aside>

      <main style={s.main}>{children}</main>
    </div>
  );
}

const s = {
  shell:      { display: 'flex', minHeight: '100vh' },
  sidebar:    {
    width: 228, background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column',
    position: 'sticky', top: 0, height: '100vh',
    overflowY: 'auto',
    boxShadow: '2px 0 8px rgba(0,53,128,0.06)',
  },
  logoWrap:   {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '1.25rem 1rem 1rem',
  },
  logoMark:   {
    width: 36, height: 36, borderRadius: 8,
    background: 'var(--blue-700)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  logoIcon:   { fontSize: 18 },
  logoName:   {
    fontFamily: 'var(--font-head)', fontWeight: 700,
    fontSize: 15, color: 'var(--text)', lineHeight: 1.2,
  },
  logoSub:    { fontSize: 11, color: 'var(--muted)', marginTop: 1 },
  divider:    { height: 1, background: 'var(--border2)', margin: '0 0.75rem 0.5rem' },
  nav:        { display: 'flex', flexDirection: 'column', padding: '0 0.5rem' },
  navItem:    {
    padding: '0.5rem 0.75rem', color: 'var(--muted)', fontSize: 13,
    borderRadius: 6, display: 'block', transition: 'all .12s',
    borderLeft: '3px solid transparent', marginBottom: 1,
    fontWeight: 500,
  },
  navActive:  {
    color: 'var(--blue-700)', borderLeftColor: 'var(--blue-700)',
    background: 'var(--blue-100)', fontWeight: 600,
  },
  menuDivider:{ height: 1, background: 'var(--border2)', margin: '0.4rem 0.25rem' },
  main:       { flex: 1, minWidth: 0, background: 'var(--bg)' },
  logoutBtn:  {
    width: '100%', padding: '0.5rem',
    background: 'transparent', border: '1px solid var(--border)',
    color: 'var(--danger)', borderRadius: 'var(--radius)',
    fontSize: 13, fontWeight: 600, transition: 'all .12s',
    fontFamily: 'var(--font-head)',
  },
};
