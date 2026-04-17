import { useNavigate } from 'react-router-dom';

const sensores = [
  { label: '🌡️ Temperatura', path: '/sensores/temperatura' },
  { label: '💧 Umidade',      path: '/sensores/umidade' },
  { label: '💡 Luminosidade', path: '/sensores/luminosidade' },
  { label: '🔢 Contador',     path: '/sensores/contador' },
];

export default function Home() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>TecnoVille — Smart City</h1>
        <button onClick={logout} style={styles.logout}>Sair</button>
      </div>
      <div style={styles.grid}>
        {sensores.map((s) => (
          <button key={s.path} style={styles.card} onClick={() => navigate(s.path)}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '500px' },
  card: { padding: '3rem 1rem', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  logout: { padding: '0.4rem 1rem', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};