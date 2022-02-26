import clsx from 'clsx';

export function ListMenu({ className, children }) {
  return (
    <ul className={clsx('flex flex-col divide-y', className)} role='tree'>
      {children}
    </ul>
  );
}

export function ListMenuItem({ className, onClick, children }) {
  if (onClick)
    return (
      <li className='flex'>
        <button className={clsx('flex grow p-4', className)} type='button' onClick={onClick}>
          {children}
        </button>
      </li>
    );

  return <li className={clsx('flex items-center p-4', className)}>{children}</li>;
}
