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
    background: 'rgba(3,14,24,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, backdropFilter: 'blur(6px)',
  },
  box: {
    background: 'rgba(10,37,64,0.85)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(0,207,255,0.2)',
    borderRadius: 16,
    width: '100%', maxWidth: 500,
    maxHeight: '90vh', overflow: 'auto',
    boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,207,255,0.06)',
    borderRadius: '16px 16px 0 0',
  },
  title: {
    fontFamily: 'var(--font-head)', fontSize: 15,
    fontWeight: 700, color: 'var(--cyan)',
  },
  close: {
    background: 'none', border: 'none',
    color: 'var(--muted)', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px',
  },
  body: { padding: '1.25rem' },
};
