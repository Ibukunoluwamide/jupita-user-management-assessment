export default function Table({
  columns,
  data = [],
  actions,
  emptyMessage = "No data available",
  loading = false,
}) {
  const colSpan = columns.length + (actions ? 1 : 0);

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    {col.header}
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={colSpan} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-500 text-sm">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 text-gray-700 whitespace-nowrap"
                      >
                        {col.render
                          ? col.render(row[col.accessor], row)
                          : row[col.accessor]}
                      </td>
                    ))}

                    {actions && (
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer text-gray-600 hover:text-gray-900"
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={colSpan}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
