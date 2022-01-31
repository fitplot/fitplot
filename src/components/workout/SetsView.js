export default function SetsView({ sets = [] }) {
  if (!sets || !sets.length) return null;

  return (
    <div className="-my-2 sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sets.map((set, i) => (
                <Set key={i} {...set} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Set({
  volume,
  amount,
  unit,
}) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{ volume }</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{ amount !== null ? `${amount} ${unit}` : null }</div>
      </td>
    </tr>
  );
}
