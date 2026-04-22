export default function Modal({ title, onClose, children }) {
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.box} onClick={e => e.stopPropagation()}>
        <div style={s.header}>
          <h3 style={s.title}>{title}</h3>
          <button style={s.close} onClick={onClose}>✕</button>
        </div>
        <div style={s.body}>{children}</div>
      </div>
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  box:     { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflow: 'auto', boxShadow: 'var(--shadow)' },
  header:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', borderBottom: '1px solid var(--border)' },
  title:   { fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--accent)' },
  close:   { background: 'none', border: 'none', color: 'var(--muted)', fontSize: 18, cursor: 'pointer' },
  body:    { padding: '1.2rem' },
};
