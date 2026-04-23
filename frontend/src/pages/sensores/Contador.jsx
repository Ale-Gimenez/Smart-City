import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Table, { td } from '../../components/Table';
import api from '../../api/axios';

export default function Contador() {
  const [dados, setDados]   = useState([]);
  const [erro, setErro]     = useState('');
  const [sensores, setSens] = useState([]);

  useEffect(() => {
    api.get('api/sensores/?sensor=CONTADOR').then(r => setSens(r.data)).catch(() => {});
    api.get('api/historicos/?sensor__sensor=CONTADOR')
      .then(r => setDados(r.data))
      .catch(() => setErro('Erro ao carregar dados.'));
  }, []);

  function nomeSensor(id) {
    const s = sensores.find(s => s.id === id);
    return s ? `#${s.id}` : id;
  }

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
          🔢 Contador
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: '1.5rem' }}>
          Histórico de leituras — unidade: uni
        </p>
        {erro && <p style={{ color: 'var(--danger)', marginBottom: 12 }}>{erro}</p>}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 14,
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}>
          <Table
            columns={['ID', 'Sensor', 'Valor (uni)', 'Timestamp']}
            rows={dados}
            emptyMsg="Nenhuma medição encontrada."
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{nomeSensor(r.sensor)}</td>
              <td style={td}>{r.valor}</td>
              <td style={td}>{new Date(r.timestamp).toLocaleString('pt-BR')}</td>
            </>)}
          />
        </div>
      </div>
    </Layout>
  );
}
