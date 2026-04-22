import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const vazio = { sensor: '', valor: '' };

export default function Historicos() {
  const [lista, setLista]     = useState([]);
  const [sensores, setSens]   = useState([]);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState(vazio);
  const [editId, setEditId]   = useState(null);
  const [erro, setErro]       = useState('');
  const [filtro, setFiltro]   = useState('');

  function carregar() {
    const q = filtro ? `api/historicos/?sensor__sensor=${filtro}` : 'api/historicos/';
    api.get(q).then(r => setLista(r.data)).catch(() => {});
    api.get('api/sensores/').then(r => setSens(r.data));
  }
  useEffect(carregar, [filtro]);

  function nomeSensor(id) {
    const s = sensores.find(s => s.id === id);
    return s ? `#${s.id} ${s.sensor}` : id;
  }

  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ sensor: r.sensor, valor: r.valor }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      const payload = { ...form, valor: parseFloat(form.valor) };
      if (editId) await api.put(`api/historicos/${editId}/`, payload);
      else        await api.post('api/historicos/', payload);
      setModal(false); carregar();
    } catch(e) {
      const data = e.response?.data;
      setErro(data?.erro || JSON.stringify(data) || 'Erro');
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir medição?')) return;
    await api.delete(`api/historicos/${id}/`);
    carregar();
  }

  const sel = { ...input, cursor: 'pointer' };
  const f = (k,v) => setForm(p => ({...p, [k]: v}));

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>📊 Medições</h1>
          <div style={{ display:'flex', gap:8 }}>
            <select style={{ ...sel, width: 180 }} value={filtro} onChange={e => setFiltro(e.target.value)}>
              <option value="">Todos os tipos</option>
              {['TEMPERATURA','UMIDADE','LUMINOSIDADE','CONTADOR'].map(t =>
                <option key={t} value={t}>{t}</option>
              )}
            </select>
            <button style={btnPrimary} onClick={abrirNovo}>+ Nova</button>
          </div>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID','Sensor','Valor','Timestamp','Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{nomeSensor(r.sensor)}</td>
              <td style={td}>{r.valor}</td>
              <td style={td}>{new Date(r.timestamp).toLocaleString('pt-BR')}</td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Medição' : 'Nova Medição'} onClose={() => setModal(false)}>
          <FormField label="Sensor">
            <select style={sel} value={form.sensor} onChange={e => f('sensor', e.target.value)}>
              <option value="">-- selecione --</option>
              {sensores.map(s => <option key={s.id} value={s.id}>#{s.id} {s.sensor} ({s.unidade_med}){!s.status ? ' — INATIVO' : ''}</option>)}
            </select>
          </FormField>
          <FormField label="Valor">
            <input style={input} type="number" step="any" value={form.valor} onChange={e => f('valor', e.target.value)} />
          </FormField>
          {erro && <p style={{ color:'var(--danger)', marginBottom:8, fontSize:12 }}>{erro}</p>}
          <button style={btnPrimary} onClick={salvar}>Salvar</button>
        </Modal>
      )}
    </Layout>
  );
}

const pg = {
  wrap:  { padding: '2rem' },
  head:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800 },
  card:  { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' },
};
