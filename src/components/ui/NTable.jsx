import { cn } from '@/lib/cn'

export default function NTable({ columns = [], rows = [], hover = true, render = {} }) {
  const alignClass = (align) =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : ''

  return (
    <div className="w-full overflow-x-auto border border-line bg-surface">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn('ng-label text-muted text-left px-4 py-3 whitespace-nowrap', alignClass(col.align))}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id ?? i}
              className={cn('border-b border-line last:border-0 transition-colors', hover ? 'hover:bg-surface-2' : '')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn('px-4 py-3 text-ink align-middle', alignClass(col.align))}
                >
                  {render[col.key] ? render[col.key](row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {!rows.length ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-muted text-sm">
                Нет данных
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
