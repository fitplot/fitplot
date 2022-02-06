export default function SetsView({ sets = [], isEditable = false, onEdit }) {
  if (!sets || sets.length === 0) return null;

  return (
    <div className='-my-2 sm:-mx-6 lg:-mx-8'>
      <div className='inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8'>
        <div className='border-b border-slate-200 shadow sm:rounded-lg'>
          <table className='min-w-full divide-y divide-slate-200'>
            <thead className='bg-slate-50'>
              <tr>
                <th
                  scope='col'
                  className='py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-500 uppercase'
                >
                  Volume
                </th>
                <th
                  scope='col'
                  className='py-3 px-6 text-xs font-medium tracking-wider text-left text-slate-500 uppercase'
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {sets.map((set) => (
                <Set key={set.id} {...set} isEditable={isEditable} onEdit={onEdit} />
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
          <td className='py-4 px-6 whitespace-nowrap'>
            <div className='text-sm font-medium text-slate-900'>{volume}</div>
          </td>
          <td className='py-4 px-6 whitespace-nowrap'>
            <div className='text-sm text-slate-900'>
              {amount !== null ? `${amount} ${unit}` : null}
            </div>
          </td>
        </>
      )}
      {isEditable && (
        <>
          <td className='whitespace-nowrap'>
            <input
              type='text'
              className='py-4 px-6 w-full text-sm font-medium text-slate-900'
              defaultValue={volume}
              onChange={(e) => onEdit(id, { volume: e.target.value })}
            />
          </td>
          <td className='w-full whitespace-nowrap'>
            <input
              type='text'
              className='py-4 px-6 text-sm text-slate-900'
              defaultValue={amount !== null ? `${amount} ${unit}` : null}
              onChange={(e) => onEdit(id, { amount: e.target.value })}
            />
          </td>
        </>
      )}
    </tr>
  );
}
