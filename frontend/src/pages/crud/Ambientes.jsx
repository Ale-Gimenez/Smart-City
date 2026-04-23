import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const vazio = { descricao: '', local: '', responsavel: '' };

export default function Ambientes() {
  const [lista, setLista]       = useState([]);
  const [locais, setLocais]     = useState([]);
  const [resps, setResps]       = useState([]);
  const [modal, setModal]       = useState(false);
  const [form, setForm]         = useState(vazio);
  const [editId, setEditId]     = useState(null);
  const [erro, setErro]         = useState('');

  function carregar() {
    api.get('api/ambientes/').then(r => setLista(r.data));
    api.get('api/locais/').then(r => setLocais(r.data));
    api.get('api/responsaveis/').then(r => setResps(r.data));
  }
  useEffect(carregar, []);

  function nomeLocal(id)  { return locais.find(l => l.id === id)?.local || id; }
  function nomeResp(id)   { return resps.find(r => r.id === id)?.nome  || id; }

  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ descricao: r.descricao, local: r.local, responsavel: r.responsavel }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      if (editId) await api.put(`api/ambientes/${editId}/`, form);
      else        await api.post('api/ambientes/', form);
      setModal(false); carregar();
    } catch(e) {
      setErro(JSON.stringify(e.response?.data || 'Erro'));
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir ambiente?')) return;
    await api.delete(`api/ambientes/${id}/`);
    carregar();
  }

  const sel = { ...input, cursor: 'pointer' };

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>🏢 Ambientes</h1>
          <button style={btnPrimary} onClick={abrirNovo}>+ Novo</button>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID', 'Descrição', 'Local', 'Responsável', 'Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.descricao}</td>
              <td style={td}>{nomeLocal(r.local)}</td>
              <td style={td}>{nomeResp(r.responsavel)}</td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️ Editar</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️ Excluir</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Ambiente' : 'Novo Ambiente'} onClose={() => setModal(false)}>
          <FormField label="Descrição">
            <input style={input} value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
          </FormField>
          <FormField label="Local">
            <select style={sel} value={form.local} onChange={e => setForm({...form, local: e.target.value})}>
              <option value="">-- selecione --</option>
              {locais.map(l => <option key={l.id} value={l.id}>{l.local}</option>)}
            </select>
          </FormField>
          <FormField label="Responsável">
            <select style={sel} value={form.responsavel} onChange={e => setForm({...form, responsavel: e.target.value})}>
              <option value="">-- selecione --</option>
              {resps.map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}
            </select>
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
