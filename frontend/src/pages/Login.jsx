import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Sphere({ size, x, y, color1, color2, anim, opacity = 0.9, blur = 0 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 35% 32%, ${color1} 0%, ${color2} 65%, rgba(0,0,0,0.6) 100%)`,
      boxShadow: `0 0 ${size * 0.4}px ${color2}55, inset 0 -${size*0.05}px ${size*0.15}px rgba(0,0,0,0.5)`,
      animation: `${anim} ease-in-out infinite`,
      opacity,
      filter: blur ? `blur(${blur}px)` : 'none',
      pointerEvents: 'none',
      zIndex: 0,
    }} />
  );
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro]         = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro(''); setLoading(true);
    try {
      const res = await api.post('api/token/', { username, password });
      localStorage.setItem('token', res.data.access);
      navigate('/home');
    } catch {
      setErro('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={s.bg}>
      <Sphere size={220} x="8%"  y="5%"  color1="#4DD9FF" color2="#0080CC" anim="float1 9s"  opacity={0.85} />
      <Sphere size={140} x="72%" y="3%"  color1="#00FFEE" color2="#0099BB" anim="float2 11s" opacity={0.80} />
      <Sphere size={180} x="78%" y="52%" color1="#30D5F5" color2="#007AB8" anim="float3 13s" opacity={0.88} />
      <Sphere size={100} x="3%"  y="65%" color1="#60E8FF" color2="#0066AA" anim="float2 8s"  opacity={0.70} />
      <Sphere size={260} x="55%" y="68%" color1="#00CFFF" color2="#004E8C" anim="float1 14s" opacity={0.65} blur={6} />
      <Sphere size={80}  x="40%" y="2%"  color1="#A0F0FF" color2="#009DB8" anim="float3 7s"  opacity={0.60} />

      <div style={s.card}>
        <div style={s.glassSheen} />

        <div style={s.brand}>
          <div style={s.logoMark}>⚡</div>
          <div>
            <div style={s.brandName}>SmartSENAI</div>
            <div style={s.brandSub}>Sistema de Monitoramento Ambiental</div>
          </div>
        </div>

        <div style={s.sep} />

        <form onSubmit={handleLogin} style={s.form}>
          <div style={s.field}>
            <label style={s.label} htmlFor="username">Usuário</label>
            <input
              id="username"
              style={s.input}
              placeholder="senai"
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div style={s.field}>
            <label style={s.label} htmlFor="password">Senha</label>
            <input
              id="password"
              style={s.input}
              type="password"
              placeholder="••••••"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {erro && (
            <div style={s.erroBox} role="alert">⚠️ {erro}</div>
          )}
          <button
            style={{ ...s.btn, opacity: loading ? 0.75 : 1 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p style={s.footer}>SmartSENAI © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

const s = {
  bg: {
    minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'radial-gradient(ellipse at 60% 40%, #0d2d4a 0%, #071828 60%, #030e18 100%)',
    position: 'relative', overflow: 'hidden',
  },
  card: {
    position: 'relative', zIndex: 10,
    width: 380,
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: '2.25rem',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  glassSheen: {
    position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    borderRadius: '0 0 50% 50%',
    pointerEvents: 'none',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' },
  logoMark: {
    width: 42, height: 42, borderRadius: 11,
    background: 'linear-gradient(135deg, #00CFFF, #0057B8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, flexShrink: 0,
    boxShadow: '0 0 16px rgba(0,207,255,0.45)',
  },
  brandName: {
    fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 19,
    color: '#F0F8FF',
    textShadow: '0 0 20px rgba(0,207,255,0.3)',
  },
  brandSub: { fontSize: 11, color: 'var(--text-sub)', marginTop: 2 },
  sep: {
    height: 1, marginBottom: '1.4rem',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
  },
  form:  { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: {
    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em',
    color: 'var(--text-sub)', fontWeight: 600,
  },
  input: {
    padding: '0.65rem 0.9rem',
    background: 'rgba(255,255,255,0.92)',  /* branco — texto escuro legível */
    border: '1px solid rgba(0,207,255,0.35)',
    borderRadius: 'var(--radius)',
    color: '#0F1F33',                       /* contraste 16:1 sobre branco */
    fontFamily: 'var(--font-head)', fontSize: 14,
    outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
  },
  erroBox: {
    background: 'rgba(255,80,80,0.15)',
    border: '1px solid rgba(255,107,122,0.45)',
    borderRadius: 'var(--radius)',
    padding: '0.55rem 0.85rem',
    color: '#FF9EA7',   /* ratio 6.1:1 sobre fundo glass */
    fontSize: 13, fontWeight: 500,
  },
  btn: {
    padding: '0.72rem',
    background: 'linear-gradient(135deg, #00CFFF, #0075CC)',
    color: '#fff',
    border: 'none', borderRadius: 'var(--radius)',
    fontWeight: 700, fontSize: 15,
    cursor: 'pointer', fontFamily: 'var(--font-head)',
    marginTop: 4,
    boxShadow: '0 4px 20px rgba(0,207,255,0.4)',
    transition: 'opacity .15s, box-shadow .15s',
    letterSpacing: '0.02em',
  },
  footer: {
    marginTop: '1.4rem', textAlign: 'center',
    fontSize: 11, color: 'var(--muted)',
  },
};
