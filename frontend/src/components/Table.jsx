export default function Table({ columns, rows, renderRow, emptyMsg = 'Nenhum registro.' }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={s.table}>
        <thead>
          <tr>
            {columns.map(c => <th key={c} style={s.th}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={columns.length} style={{ ...s.td, textAlign: 'center', color: 'var(--muted)' }}>{emptyMsg}</td></tr>
            : rows.map((row, i) => <tr key={i} style={s.tr}>{renderRow(row)}</tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

const s = {
  table: { width: '100%', borderCollapse: 'collapse' },
  th:    { padding: '0.6rem 0.9rem', textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--accent)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, fontFamily: 'var(--font-head)', whiteSpace: 'nowrap' },
  td:    { padding: '0.6rem 0.9rem', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: 13 },
  tr:    {},
};

export const td = s.td;
