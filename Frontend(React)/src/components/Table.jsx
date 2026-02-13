

export default function Table({ columns, data, actions }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 font-semibold">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 font-semibold">Actions</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-sm">
          {data?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition duration-200"
            >
              {columns?.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                   {
                       row[col.accessor]
                   } 
              
                </td>
              ))}

              {actions && (
                <td className="px-6 py-4 flex gap-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                      {action.icon}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
