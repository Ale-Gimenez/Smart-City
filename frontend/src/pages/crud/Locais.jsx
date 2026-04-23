import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const vazio = { local: '' };

export default function Locais() {
  const [lista, setLista]   = useState([]);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erro, setErro]     = useState('');

  function carregar() {
    api.get('api/locais/').then(r => setLista(r.data)).catch(() => {});
  }
  useEffect(carregar, []);

  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ local: r.local }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      if (editId) await api.put(`api/locais/${editId}/`, form);
      else        await api.post('api/locais/', form);
      setModal(false); carregar();
    } catch(e) {
      setErro(JSON.stringify(e.response?.data || 'Erro'));
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir local?')) return;
    await api.delete(`api/locais/${id}/`);
    carregar();
  }

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>📍 Locais</h1>
          <button style={btnPrimary} onClick={abrirNovo}>+ Novo</button>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID', 'Local', 'Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.local}</td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️ Editar</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️ Excluir</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Local' : 'Novo Local'} onClose={() => setModal(false)}>
          <FormField label="Local">
            <input style={input} value={form.local} onChange={e => setForm({...form, local: e.target.value})} />
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
