import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

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
      {/* Detalhe geométrico */}
      <div style={s.blueBar} />
      <div style={s.blueDot} />

      <div style={s.card}>
        {/* Cabeçalho */}
        <div style={s.brand}>
          <div style={s.logoMark}><span style={{ fontSize: 20 }}>⚡</span></div>
          <div>
            <div style={s.brandName}>SmartSENAI</div>
            <div style={s.brandSub}>Sistema de Monitoramento Ambiental</div>
          </div>
        </div>

        <div style={s.separator} />

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
            <div style={s.erroBox} role="alert">
              <span>⚠️</span> {erro}
            </div>
          )}
          <button style={{ ...s.btn, opacity: loading ? 0.75 : 1 }} type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p style={s.footer}>TecnoVille © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

const s = {
  bg: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', position: 'relative', overflow: 'hidden',
  },
  blueBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 5,
    background: 'linear-gradient(90deg, var(--blue-900), var(--blue-500))',
  },
  blueDot: {
    position: 'absolute', top: -120, right: -120,
    width: 360, height: 360, borderRadius: '50%',
    background: 'var(--blue-100)', opacity: 0.7,
    pointerEvents: 'none',
  },
  card: {
    position: 'relative', background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 14, padding: '2.25rem',
    width: 380, boxShadow: 'var(--shadow-md)',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' },
  logoMark: {
    width: 44, height: 44, borderRadius: 10,
    background: 'var(--blue-700)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  brandName: {
    fontFamily: 'var(--font-head)', fontSize: 20,
    fontWeight: 700, color: 'var(--text)',
  },
  brandSub: { fontSize: 12, color: 'var(--muted)', marginTop: 2 },
  separator: { height: 1, background: 'var(--border2)', marginBottom: '1.5rem' },
  form:  { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: {
    fontSize: 11, textTransform: 'uppercase',
    letterSpacing: '0.07em', color: 'var(--muted)', fontWeight: 600,
  },
  input: {
    padding: '0.6rem 0.8rem',
    background: 'var(--surface2)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text)',
    fontFamily: 'var(--font-head)', fontSize: 14,
  },
  erroBox: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#FFF0EE', border: '1px solid #F5C6C0',
    borderRadius: 'var(--radius)', padding: '0.55rem 0.8rem',
    color: 'var(--danger)', fontSize: 13, fontWeight: 500,
  },
  btn: {
    padding: '0.7rem',
    background: 'var(--blue-700)', color: '#fff',
    border: 'none', borderRadius: 'var(--radius)',
    fontWeight: 700, fontSize: 15, cursor: 'pointer',
    fontFamily: 'var(--font-head)', marginTop: 4,
    boxShadow: '0 2px 8px rgba(0,87,184,0.25)',
    transition: 'background .15s',
  },
  footer: {
    marginTop: '1.5rem', textAlign: 'center',
    fontSize: 11, color: 'var(--muted)',
  },
};
