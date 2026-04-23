export default function Modal({ title, onClose, children }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.box} onClick={e => e.stopPropagation()}>
        <div style={s.header}>
          <h3 style={s.title}>{title}</h3>
          <button style={s.close} onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div style={s.body}>{children}</div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(15,31,51,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, backdropFilter: 'blur(2px)',
  },
  box: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    width: '100%', maxWidth: 500,
    maxHeight: '90vh', overflow: 'auto',
    boxShadow: 'var(--shadow-md)',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid var(--border2)',
    background: 'var(--blue-50)',
    borderRadius: '12px 12px 0 0',
  },
  title: {
    fontFamily: 'var(--font-head)', fontSize: 15,
    fontWeight: 700, color: 'var(--blue-900)',
  },
  close: {
    background: 'none', border: 'none',
    color: 'var(--muted)', fontSize: 18, cursor: 'pointer',
    lineHeight: 1, padding: '0 4px',
  },
  body: { padding: '1.25rem' },
};
