export default function Table({ columns, rows, renderRow, emptyMsg = 'Nenhum registro.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={s.table}>
        <thead>
          <tr style={{ background: 'var(--blue-100)' }}>
            {columns.map(c => <th key={c} style={s.th}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={columns.length} style={{ ...s.td, textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>{emptyMsg}</td></tr>
            : rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)' }}>
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
  th:    {
    padding: '0.65rem 1rem', textAlign: 'left',
    color: 'var(--blue-900)', fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.07em',
    fontWeight: 700, fontFamily: 'var(--font-head)',
    whiteSpace: 'nowrap', borderBottom: '2px solid var(--border)',
  },
  td: {
    padding: '0.65rem 1rem',
    borderBottom: '1px solid var(--border2)',
    color: 'var(--text)', fontSize: 14,
  },
};

export const td = s.td;
