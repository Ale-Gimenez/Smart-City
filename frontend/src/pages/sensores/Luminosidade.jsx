import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function Temperatura() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('historicos/?sensor__mic__sensor=TEMPERATURA')
      .then((res) => setDados(res.data))
      .catch(() => setErro('Erro ao carregar dados.'));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/home')}>← Voltar</button>
      <h2>🌡️ Temperatura</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#f0f2f5' }}>
          <tr>
            <th>ID</th>
            <th>Sensor</th>
            <th>Valor (°C)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.sensor}</td>
              <td>{d.valor}</td>
              <td>{new Date(d.timestamp).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}