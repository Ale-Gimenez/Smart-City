import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const SENSOR_CHOICES    = ['TEMPERATURA','UMIDADE','LUMINOSIDADE','CONTADOR'];
const UNIDADE_CHOICES   = ['°C','%','LUX','UNI'];
const vazio = { sensor: 'TEMPERATURA', unidade_med: '°C', status: false, mic: '' };

export default function Sensores() {
  const [lista, setLista]   = useState([]);
  const [mics, setMics]     = useState([]);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erro, setErro]     = useState('');

  function carregar() {
    api.get('api/sensores/').then(r => setLista(r.data));
    api.get('api/microcontroladores/').then(r => setMics(r.data));
  }
  useEffect(carregar, []);

  function nomeMic(id) { return mics.find(m => m.id === id)?.mac_address || id; }
  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ sensor: r.sensor, unidade_med: r.unidade_med, status: r.status, mic: r.mic }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      if (editId) await api.put(`api/sensores/${editId}/`, form);
      else        await api.post('api/sensores/', form);
      setModal(false); carregar();
    } catch(e) {
      setErro(JSON.stringify(e.response?.data || 'Erro'));
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir sensor?')) return;
    await api.delete(`api/sensores/${id}/`);
    carregar();
  }

  const sel = { ...input, cursor: 'pointer' };
  const f = (k,v) => setForm(p => ({...p, [k]: v}));

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>📟 Sensores</h1>
          <button style={btnPrimary} onClick={abrirNovo}>+ Novo</button>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID','Tipo','Unidade','Status','Microcontrolador','Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.sensor}</td>
              <td style={td}>{r.unidade_med}</td>
              <td style={td}><span style={{ color: r.status ? 'var(--success)' : 'var(--danger)' }}>{r.status ? '● Ativo' : '○ Inativo'}</span></td>
              <td style={td}><code style={{ fontSize:11 }}>{nomeMic(r.mic)}</code></td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️ Editar</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️ Excluir</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Sensor' : 'Novo Sensor'} onClose={() => setModal(false)}>
          <FormField label="Tipo de Sensor">
            <select style={sel} value={form.sensor} onChange={e => f('sensor', e.target.value)}>
              {SENSOR_CHOICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormField>
          <FormField label="Unidade de Medida">
            <select style={sel} value={form.unidade_med} onChange={e => f('unidade_med', e.target.value)}>
              {UNIDADE_CHOICES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </FormField>
          <FormField label="Microcontrolador">
            <select style={sel} value={form.mic} onChange={e => f('mic', e.target.value)}>
              <option value="">-- selecione --</option>
              {mics.map(m => <option key={m.id} value={m.id}>{m.mac_address} ({m.modelo})</option>)}
            </select>
          </FormField>
          <FormField label="Status">
            <label style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text)', cursor:'pointer' }}>
              <input type="checkbox" checked={form.status} onChange={e => f('status', e.target.checked)} />
              Ativo
            </label>
          </FormField>
          {erro && <p style={{ color:'var(--danger)', marginBottom:8, fontSize:12 }}>{erro}</p>}
          <button style={btnPrimary} onClick={salvar}>Salvar</button>
        </Modal>
      )}
    </Layout>
  );
}

const pg = {
  wrap:  { padding: '2rem', minHeight: '100vh' },
  head:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 700, color: 'var(--text)' },
  card:  {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 14,
    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
};
