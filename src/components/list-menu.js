import clsx from 'clsx';
import React from 'react';

export function ListMenu({ className, children }) {
  return (
    <ul className={clsx('flex flex-col', className)} role='tree'>
      {children}
    </ul>
  );
}
// TODO: FIX: the `divide-y` borders between list items and groups are interacting pretty wonky
export const ListMenuItem = React.forwardRef(
  ({ className, onClick, children }, ref) => {
    if (onClick)
      return (
        <li className='flex'>
          <button
            className={clsx('flex grow p-4 font-medium bg-white', className)}
            ref={ref}
            type='button'
            onClick={onClick}
          >
            {children}
          </button>
        </li>
      );

    return (
      <li
        className={clsx('flex items-center p-4 bg-white', className)}
        ref={ref}
      >
        {children}
      </li>
    );
  }
);

export const ListMenuTextInput = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li className={clsx('bg-white', className)}>
      <input
        type='text'
        ref={ref}
        {...props}
        className='p-4 w-full placeholder:text-gray-500 disabled:text-gray-400 bg-slate-100'
      />
    </li>
  )
);

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
