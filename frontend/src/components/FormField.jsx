export default function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{ display: 'block', color: 'var(--muted)', fontSize: 12, marginBottom: 5, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export const input = {
  width: '100%', padding: '0.55rem 0.7rem',
  background: 'var(--surface2)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius)', color: 'var(--text)',
  fontFamily: 'var(--font-mono)', fontSize: 13,
};

export const btnPrimary = {
  padding: '0.55rem 1.2rem', background: 'var(--accent)',
  color: '#000', border: 'none', borderRadius: 'var(--radius)',
  fontWeight: 700, fontSize: 13,
};

export const btnDanger = {
  padding: '0.3rem 0.7rem', background: 'transparent',
  color: 'var(--danger)', border: '1px solid var(--danger)',
  borderRadius: 'var(--radius)', fontSize: 12,
};

export const btnEdit = {
  padding: '0.3rem 0.7rem', background: 'transparent',
  color: 'var(--warning)', border: '1px solid var(--warning)',
  borderRadius: 'var(--radius)', fontSize: 12, marginRight: 6,
};
