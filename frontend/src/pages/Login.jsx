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
      {/* grade decorativa */}
      <div style={s.grid} aria-hidden />

      <div style={s.card}>
        <div style={s.brand}>
          <span style={s.brandIcon}>⚡</span>
          <span style={s.brandName}>TecnoVille</span>
        </div>
        <p style={s.sub}>Sistema de Monitoramento Smart City</p>

        <form onSubmit={handleLogin} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Usuário</label>
            <input
              style={s.input}
              placeholder="senai"
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Senha</label>
            <input
              style={s.input}
              type="password"
              placeholder="••••••"
              value={password}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {erro && <p style={s.erro}>{erro}</p>}
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar →'}
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  bg:        { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', position: 'relative', overflow: 'hidden' },
  grid:      { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 },
  card:      { position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '2.5rem', width: 360, boxShadow: '0 0 60px rgba(0,229,255,0.07)' },
  brand:     { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 },
  brandIcon: { fontSize: 28, color: 'var(--accent)' },
  brandName: { fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 800, color: 'var(--text)' },
  sub:       { color: 'var(--muted)', fontSize: 13, marginBottom: '1.8rem' },
  form:      { display: 'flex', flexDirection: 'column', gap: '1rem' },
  field:     { display: 'flex', flexDirection: 'column', gap: 6 },
  label:     { fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)' },
  input:     { padding: '0.6rem 0.8rem', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13 },
  btn:       { padding: '0.7rem', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-mono)', marginTop: 4 },
  erro:      { color: 'var(--danger)', fontSize: 12, textAlign: 'center' },
};
