import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../api/axios';

const cards = [
  { label: 'Temperatura', tipo: 'TEMPERATURA', icon: '🌡️', unidade: '°C',  path: '/sensores/temperatura', cor: '#f43f5e' },
  { label: 'Umidade',     tipo: 'UMIDADE',     icon: '💧', unidade: '%',   path: '/sensores/umidade',     cor: '#3b82f6' },
  { label: 'Luminosidade',tipo: 'LUMINOSIDADE',icon: '💡', unidade: 'lux', path: '/sensores/luminosidade',cor: '#f59e0b' },
  { label: 'Contador',    tipo: 'CONTADOR',    icon: '🔢', unidade: 'uni', path: '/sensores/contador',    cor: '#10b981' },
];

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [user, setUser]   = useState(null);

  useEffect(() => {
    api.get('api/me/').then(r => setUser(r.data)).catch(() => {});
    // busca a última medição de cada tipo para mostrar no card
    cards.forEach(c => {
      api.get(`api/historicos/?sensor__sensor=${c.tipo}&ordering=-timestamp`)
        .then(r => {
          const lista = r.data;
          if (lista.length) setStats(p => ({ ...p, [c.tipo]: lista[0].valor }));
        })
        .catch(() => {});
    });
  }, []);

  return (
    <Layout>
      <div style={s.wrap}>
        <div style={s.header}>
          <div>
            <h1 style={s.title}>Dashboard</h1>
            <p style={s.sub}>Smart City — TecnoVille</p>
          </div>
          {user && (
            <div style={s.userBadge}>
              <span style={s.userIcon}>👤</span>
              <div>
                <div style={{ color: 'var(--text)', fontSize: 13 }}>{user.nome}</div>
                <div style={{ color: 'var(--muted)', fontSize: 11 }}>{user.tipo}</div>
              </div>
            </div>
          )}
        </div>

        <div style={s.grid}>
          {cards.map(c => (
            <button
              key={c.tipo}
              style={{ ...s.card, '--cor': c.cor }}
              onClick={() => navigate(c.path)}
            >
              <div style={{ ...s.cardAccent, background: c.cor }} />
              <div style={s.cardIcon}>{c.icon}</div>
              <div style={s.cardLabel}>{c.label}</div>
              <div style={{ ...s.cardValue, color: c.cor }}>
                {stats[c.tipo] !== undefined ? `${stats[c.tipo]} ${c.unidade}` : '—'}
              </div>
              <div style={s.cardHint}>Última leitura</div>
              <div style={s.cardArrow}>Ver histórico →</div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const s = {
  wrap:       { padding: '2rem' },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' },
  title:      { fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: 'var(--text)' },
  sub:        { color: 'var(--muted)', fontSize: 13, marginTop: 4 },
  userBadge:  { display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '0.6rem 1rem' },
  userIcon:   { fontSize: 22 },
  grid:       { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.2rem', maxWidth: 700 },
  card:       { position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', textAlign: 'left', cursor: 'pointer', overflow: 'hidden', transition: 'border-color .2s, transform .15s' },
  cardAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: '12px 12px 0 0' },
  cardIcon:   { fontSize: 32, marginBottom: '0.5rem' },
  cardLabel:  { fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 },
  cardValue:  { fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-head)', marginBottom: 2 },
  cardHint:   { fontSize: 11, color: 'var(--muted)', marginBottom: '1rem' },
  cardArrow:  { fontSize: 12, color: 'var(--accent)' },
};
