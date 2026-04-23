export default function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{
        display: 'block', color: 'var(--muted)', fontSize: 11,
        marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em',
        fontWeight: 600,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export const input = {
  width: '100%', padding: '0.55rem 0.75rem',
  background: 'var(--surface)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', color: 'var(--text)',
  fontFamily: 'var(--font-head)', fontSize: 14,
  transition: 'border-color .15s, box-shadow .15s',
};

export const btnPrimary = {
  padding: '0.55rem 1.2rem',
  background: 'var(--blue-700)',
  color: '#fff',
  border: 'none',
  borderRadius: 'var(--radius)',
  fontWeight: 600,
  fontSize: 14,
  fontFamily: 'var(--font-head)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'background .15s',
};

export const btnDanger = {
  padding: '0.28rem 0.65rem',
  background: 'transparent',
  color: 'var(--danger)',
  border: '1px solid var(--danger)',
  borderRadius: 'var(--radius)',
  fontSize: 12,
  fontFamily: 'var(--font-head)',
};

export const btnEdit = {
  padding: '0.28rem 0.65rem',
  background: 'transparent',
  color: 'var(--warning)',
  border: '1px solid var(--warning)',
  borderRadius: 'var(--radius)',
  fontSize: 12,
  marginRight: 6,
  fontFamily: 'var(--font-head)',
};
