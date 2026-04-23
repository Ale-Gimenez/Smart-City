import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const vazio = { modelo: '', mac_address: '', latitude: '', longitude: '', status: false, ambiente: '' };

export default function Microcontroladores() {
  const [lista, setLista]     = useState([]);
  const [ambientes, setAmbs]  = useState([]);
  const [modal, setModal]     = useState(false);
  const [form, setForm]       = useState(vazio);
  const [editId, setEditId]   = useState(null);
  const [erro, setErro]       = useState('');

  function carregar() {
    api.get('api/microcontroladores/').then(r => setLista(r.data));
    api.get('api/ambientes/').then(r => setAmbs(r.data));
  }
  useEffect(carregar, []);

  function nomeAmb(id) { return ambientes.find(a => a.id === id)?.descricao || id; }
  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ modelo: r.modelo, mac_address: r.mac_address, latitude: r.latitude, longitude: r.longitude, status: r.status, ambiente: r.ambiente }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      const payload = { ...form, latitude: parseFloat(form.latitude), longitude: parseFloat(form.longitude) };
      if (editId) await api.put(`api/microcontroladores/${editId}/`, payload);
      else        await api.post('api/microcontroladores/', payload);
      setModal(false); carregar();
    } catch(e) {
      setErro(JSON.stringify(e.response?.data || 'Erro'));
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir microcontrolador?')) return;
    await api.delete(`api/microcontroladores/${id}/`);
    carregar();
  }

  const sel = { ...input, cursor: 'pointer' };
  const f = (k, v) => setForm(p => ({...p, [k]: v}));

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>🖥️ Microcontroladores</h1>
          <button style={btnPrimary} onClick={abrirNovo}>+ Novo</button>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID','Modelo','MAC','Latitude','Longitude','Status','Ambiente','Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.modelo}</td>
              <td style={td}><code style={{ fontSize:11 }}>{r.mac_address}</code></td>
              <td style={td}>{r.latitude}</td>
              <td style={td}>{r.longitude}</td>
              <td style={td}><span style={{ color: r.status ? 'var(--success)' : 'var(--danger)' }}>{r.status ? '● Ativo' : '○ Inativo'}</span></td>
              <td style={td}>{nomeAmb(r.ambiente)}</td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Microcontrolador' : 'Novo Microcontrolador'} onClose={() => setModal(false)}>
          <FormField label="Modelo"><input style={input} value={form.modelo}      onChange={e => f('modelo', e.target.value)} /></FormField>
          <FormField label="MAC Address"><input style={input} value={form.mac_address} onChange={e => f('mac_address', e.target.value)} /></FormField>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <FormField label="Latitude"><input  style={input} type="number" value={form.latitude}   onChange={e => f('latitude', e.target.value)}  /></FormField>
            <FormField label="Longitude"><input style={input} type="number" value={form.longitude}  onChange={e => f('longitude', e.target.value)} /></FormField>
          </div>
          <FormField label="Ambiente">
            <select style={sel} value={form.ambiente} onChange={e => f('ambiente', e.target.value)}>
              <option value="">-- selecione --</option>
              {ambientes.map(a => <option key={a.id} value={a.id}>{a.descricao}</option>)}
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
