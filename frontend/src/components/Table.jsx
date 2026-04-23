export default function Table({ columns, rows, renderRow, emptyMsg = 'Nenhum registro.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={s.table}>
        <thead>
          <tr style={{ background: 'rgba(0,207,255,0.07)' }}>
            {columns.map(c => <th key={c} style={s.th}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={columns.length} style={{ ...s.td, textAlign: 'center', color: 'var(--muted)', padding: '2.5rem' }}>{emptyMsg}</td></tr>
            : rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0,207,255,0.03)' }}>
                  {renderRow(row)}
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

const s = {
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '0.65rem 1rem', textAlign: 'left',
    color: 'var(--cyan)', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    fontWeight: 700, fontFamily: 'var(--font-head)',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(0,207,255,0.2)',
  },
  td: {
    padding: '0.65rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    color: 'var(--text)', fontSize: 14,
  },
};

export const td = s.td;
