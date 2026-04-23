import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import Table, { td } from '../../components/Table';
import FormField, { input, btnPrimary, btnEdit, btnDanger } from '../../components/FormField';
import api from '../../api/axios';

const vazio = { username: '', password: '', nome: '', telefone: '', tipo: 'USUARIO' };

export default function Usuarios() {
  const [lista, setLista]   = useState([]);
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(vazio);
  const [editId, setEditId] = useState(null);
  const [erro, setErro]     = useState('');

  function carregar() {
    api.get('api/usuarios/').then(r => setLista(r.data)).catch(() => {});
  }
  useEffect(carregar, []);

  function abrirNovo()    { setForm(vazio); setEditId(null); setErro(''); setModal(true); }
  function abrirEditar(r) { setForm({ username: '', password: '', nome: r.nome, telefone: r.telefone || '', tipo: r.tipo }); setEditId(r.id); setErro(''); setModal(true); }

  async function salvar() {
    setErro('');
    try {
      if (editId) {
        // PATCH apenas nos campos do perfil (não altera senha aqui)
        await api.patch(`api/usuarios/${editId}/`, { nome: form.nome, telefone: form.telefone, tipo: form.tipo });
      } else {
        // Novo usuário via endpoint de registro
        await api.post('api/register/', form);
      }
      setModal(false); carregar();
    } catch(e) {
      setErro(JSON.stringify(e.response?.data || 'Erro'));
    }
  }

  async function excluir(id) {
    if (!confirm('Excluir usuário?')) return;
    await api.delete(`api/usuarios/${id}/`);
    carregar();
  }

  const sel = { ...input, cursor: 'pointer' };
  const f = (k,v) => setForm(p => ({...p, [k]: v}));

  return (
    <Layout>
      <div style={pg.wrap}>
        <div style={pg.head}>
          <h1 style={pg.title}>👥 Usuários</h1>
          <button style={btnPrimary} onClick={abrirNovo}>+ Novo</button>
        </div>
        <div style={pg.card}>
          <Table
            columns={['ID','Nome','Telefone','Tipo','Ações']}
            rows={lista}
            renderRow={r => (<>
              <td style={td}>{r.id}</td>
              <td style={td}>{r.nome}</td>
              <td style={td}>{r.telefone || '—'}</td>
              <td style={td}><span style={{ color: r.tipo === 'ADMINISTRADOR' ? 'var(--blue-700)' : 'var(--muted)' }}>{r.tipo}</span></td>
              <td style={td}>
                <button style={btnEdit}   onClick={() => abrirEditar(r)}>✏️ Editar</button>
                <button style={btnDanger} onClick={() => excluir(r.id)}>🗑️ Excluir</button>
              </td>
            </>)}
          />
        </div>
      </div>

      {modal && (
        <Modal title={editId ? 'Editar Usuário' : 'Novo Usuário'} onClose={() => setModal(false)}>
          {!editId && <>
            <FormField label="Username"><input style={input} value={form.username}  onChange={e => f('username', e.target.value)} /></FormField>
            <FormField label="Senha">   <input style={input} type="password" value={form.password}  onChange={e => f('password', e.target.value)} /></FormField>
          </>}
          <FormField label="Nome">     <input style={input} value={form.nome}      onChange={e => f('nome', e.target.value)} /></FormField>
          <FormField label="Telefone"> <input style={input} value={form.telefone}  onChange={e => f('telefone', e.target.value)} /></FormField>
          <FormField label="Tipo">
            <select style={sel} value={form.tipo} onChange={e => f('tipo', e.target.value)}>
              <option value="USUARIO">Usuário</option>
              <option value="ADMINISTRADOR">Administrador</option>
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
