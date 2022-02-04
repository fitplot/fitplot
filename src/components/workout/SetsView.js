export default function SetsView({ sets = [], isEditable = false, onEdit }) {
  if (!sets || !sets.length) return null;

  return (
    <div className="-my-2 sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow border-b border-slate-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Volume
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sets.map((set) => (
                <Set
                  key={set.id}
                  {...set}
                  isEditable={isEditable}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Set({ id, volume, amount, unit, isEditable, onEdit }) {
  return (
    <tr>
      {!isEditable && (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-slate-900">{volume}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-slate-900">
              {amount !== null ? `${amount} ${unit}` : null}
            </div>
          </td>
        </>
      )}
      {isEditable && (
        <>
          <td className="whitespace-nowrap">
            <input
              type="text"
              className="px-6 py-4 text-sm font-medium text-slate-900 w-full"
              defaultValue={volume}
              onChange={(e) => onEdit(id, { volume: e.target.value })}
            />
          </td>
          <td className="whitespace-nowrap w-full">
            <input
              type="text"
              className="px-6 py-4 text-sm text-slate-900"
              defaultValue={amount !== null ? `${amount} ${unit}` : null}
              onChange={(e) => onEdit(id, { amount: e.target.value })}
            />
          </td>
        </>
      )}
    </tr>
  );
}
