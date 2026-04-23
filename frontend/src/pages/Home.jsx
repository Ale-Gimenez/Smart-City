import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../api/axios';

const cards = [
  { label: 'Temperatura', tipo: 'TEMPERATURA', icon: '🌡️', unidade: '°C',  path: '/sensores/temperatura', cor: '#FF6B7A', glow: 'rgba(255,107,122,0.35)' },
  { label: 'Umidade',     tipo: 'UMIDADE',     icon: '💧', unidade: '%',   path: '/sensores/umidade',     cor: '#38A8FF', glow: 'rgba(56,168,255,0.35)'  },
  { label: 'Luminosidade',tipo: 'LUMINOSIDADE',icon: '💡', unidade: 'lux', path: '/sensores/luminosidade',cor: '#FBBF24', glow: 'rgba(251,191,36,0.35)'  },
  { label: 'Contador',    tipo: 'CONTADOR',    icon: '🔢', unidade: 'uni', path: '/sensores/contador',    cor: '#34D399', glow: 'rgba(52,211,153,0.35)'  },
];

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [user, setUser]   = useState(null);

  useEffect(() => {
    api.get('api/me/').then(r => setUser(r.data)).catch(() => {});
    cards.forEach(c => {
      api.get(`api/historicos/?sensor__sensor=${c.tipo}&ordering=-timestamp`)
        .then(r => { if (r.data.length) setStats(p => ({ ...p, [c.tipo]: r.data[0].valor })); })
        .catch(() => {});
    });
  }, []);

  return (
    <Layout>
      <div style={s.wrap}>
        <div style={s.header}>
          <div style={s.neonLine} />
          <div style={s.headerInner}>
            <div>
              <h1 style={s.title}>Dashboard</h1>
              <p style={s.sub}>Monitoramento em tempo real — SmartSENAI</p>
            </div>
            {user && (
              <div style={s.userBadge}>
                <div style={s.avatar}>{(user.nome || '?')[0].toUpperCase()}</div>
                <div>
                  <div style={s.userName}>{user.nome}</div>
                  <div style={s.userTipo}>{user.tipo}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        <div style={s.grid}>
          {cards.map(c => (
            <button
              key={c.tipo}
              style={{ ...s.card, '--glow': c.glow }}
              onClick={() => navigate(c.path)}
            >
              <div style={s.cardSheen} />
              <div style={{ ...s.iconWrap, boxShadow: `0 0 20px ${c.glow}`, background: `${c.cor}18` }}>
                <span style={{ fontSize: 26 }}>{c.icon}</span>
              </div>
              <div style={{ ...s.cardLabel, color: 'var(--text-sub)' }}>{c.label}</div>
              <div style={{ ...s.cardValue, color: c.cor, textShadow: `0 0 16px ${c.glow}` }}>
                {stats[c.tipo] !== undefined ? `${stats[c.tipo]} ${c.unidade}` : '—'}
              </div>
              <div style={s.cardHint}>Última leitura</div>
              <div style={{ ...s.cardLink, color: c.cor }}>Ver histórico →</div>
            </button>
          ))}
        </div>

        <p style={s.hint}>
          💡 Use o menu lateral para gerenciar sensores, ambientes, medições e usuários.
        </p>
      </div>
    </Layout>
  );
}

const s = {
  wrap:      { minHeight: '100vh' },
  header:    {
    background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    marginBottom: '1.75rem',
  },
  neonLine:  { height: 2, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' },
  headerInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem' },
  title:     { fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--text)' },
  sub:       { color: 'var(--muted)', fontSize: 13, marginTop: 2 },
  userBadge: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(0,207,255,0.07)',
    border: '1px solid rgba(0,207,255,0.2)',
    borderRadius: 10, padding: '0.55rem 0.9rem',
  },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'linear-gradient(135deg, #00CFFF, #0057B8)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 14, flexShrink: 0,
    boxShadow: '0 0 10px rgba(0,207,255,0.4)',
  },
  userName:  { fontSize: 13, fontWeight: 600, color: 'var(--text)' },
  userTipo:  { fontSize: 11, color: 'var(--muted)' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
    gap: '1.2rem', maxWidth: 680, padding: '0 2rem',
  },
  card: {
    position: 'relative', overflow: 'hidden',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16, padding: '1.4rem',
    textAlign: 'left', cursor: 'pointer',
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    transition: 'transform .15s, box-shadow .15s',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  cardSheen: {
    position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
    pointerEvents: 'none',
  },
  iconWrap: {
    width: 48, height: 48, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 6, border: '1px solid rgba(255,255,255,0.1)',
  },
  cardLabel: { fontSize: 13, fontWeight: 600 },
  cardValue: { fontSize: 30, fontWeight: 700, fontFamily: 'var(--font-head)', lineHeight: 1.1 },
  cardHint:  { fontSize: 11, color: 'var(--muted)' },
  cardLink:  { fontSize: 12, fontWeight: 600, marginTop: 8 },
  hint:      { padding: '1.5rem 2rem', color: 'var(--muted)', fontSize: 13 },
};
