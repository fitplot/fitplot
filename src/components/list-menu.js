import clsx from 'clsx';

export function ListMenu({ className, children }) {
  return (
    <ul className={clsx('flex flex-col divide-y', className)} role='tree'>
      {children}
    </ul>
  );
}
// TODO: FIX: the `divide-y` borders between list items and groups are interacting pretty wonky
export function ListMenuItem({ className, onClick, children }) {
  if (onClick)
    return (
      <li className='flex'>
        <button
          className={clsx('flex grow p-4 font-medium bg-white', className)}
          type='button'
          onClick={onClick}
        >
          {children}
        </button>
      </li>
    );

  return (
    <li className={clsx('flex items-center p-4 bg-white', className)}>
      {children}
    </li>
  );
}

export function ListMenuGroup({ className, title, children }) {
  if (title) {
    return (
      <div className={clsx('flex flex-col pt-4 divide-y', className)}>
        <div className='flex px-4 mb-2 text-xs font-medium uppercase text-ellipsis whitespace-nowrap'>
          {title}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={clsx('flex flex-col pt-4 divide-y', className)}>
      {children}
    </div>
  );
}
