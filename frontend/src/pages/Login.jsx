import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post('api/token/', { username, password });
      localStorage.setItem('token', res.data.access);
      navigate('/home');
    } catch {
      setErro('Usuário ou senha inválidos.');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>TecnoVille 🏙️</h2>
        <p>Sistema de Monitoramento</p>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          <button style={styles.button} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: '320px', textAlign: 'center' },
  input: { display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.7rem', marginTop: '0.5rem', background: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};