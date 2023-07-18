import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { usePageContextValues } from '../page';

export default function TopBar({ noop, onToggleMenu }) {
  const { title, onMoreAction } = usePageContextValues();

  return (
    <div className='flex h-12 items-center justify-between border-b bg-slate-50 px-1'>
      {!noop && (
        <TopBarButton
          Icon={Bars3Icon}
          className='shrink-0'
          onClick={onToggleMenu}
        />
      )}
      <div className='flex grow items-center px-2'>
        <span>{title}</span>
      </div>
      {!noop && onMoreAction && (
        <TopBarButton
          Icon={EllipsisHorizontalIcon}
          className='shrink-0'
          onClick={() => onMoreAction()}
        />
      )}
    </div>
  );
}

function TopBarButton({ className, Icon, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        'flex h-full w-10 items-center justify-center',
        className
      )}
      type='button'
    >
      <Icon className='h-6 w-6' />
    </button>
  );
}
