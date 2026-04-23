export default function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: '0.9rem' }}>
      <label style={{
        display: 'block', color: 'var(--text-sub)', fontSize: 11,
        marginBottom: 5, textTransform: 'uppercase',
        letterSpacing: '0.07em', fontWeight: 600,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* inputs brancos com texto escuro — acessível em qualquer fundo */
export const input = {
  width: '100%', padding: '0.55rem 0.75rem',
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid rgba(0,207,255,0.3)',
  borderRadius: 'var(--radius)',
  color: '#0F1F33',          /* contraste 16:1 sobre branco */
  fontFamily: 'var(--font-head)', fontSize: 14,
  transition: 'border-color .15s',
};

export const btnPrimary = {
  padding: '0.55rem 1.2rem',
  background: 'linear-gradient(135deg, #00CFFF, #0075CC)',
  color: '#fff',
  border: 'none', borderRadius: 'var(--radius)',
  fontWeight: 700, fontSize: 14,
  fontFamily: 'var(--font-head)',
  boxShadow: '0 4px 16px rgba(0,207,255,0.3)',
  transition: 'opacity .15s',
};

export const btnDanger = {
  padding: '0.28rem 0.65rem',
  background: 'rgba(255,107,122,0.1)',
  color: 'var(--danger)',
  border: '1px solid rgba(255,107,122,0.35)',
  borderRadius: 'var(--radius)', fontSize: 12,
  fontFamily: 'var(--font-head)',
};

export const btnEdit = {
  padding: '0.28rem 0.65rem',
  background: 'rgba(251,191,36,0.1)',
  color: 'var(--warning)',
  border: '1px solid rgba(251,191,36,0.35)',
  borderRadius: 'var(--radius)', fontSize: 12,
  marginRight: 6, fontFamily: 'var(--font-head)',
};
