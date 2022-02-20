import { DotsHorizontalIcon, MenuIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export default function TopBar({ onToggleMenu }) {
  return (
    <div className='flex justify-between items-center px-1 h-12 bg-slate-50 border-b'>
      <TopBarButton Icon={MenuIcon} className='shrink-0' onClick={onToggleMenu} />
      <TopBarButton Icon={DotsHorizontalIcon} className='shrink-0' />
    </div>
  );
}

function TopBarButton({ className, Icon, ...props }) {
  return (
    <button
      {...props}
      className={clsx('flex justify-center items-center w-10 h-full', className)}
      type='button'
    >
      <Icon className='w-6 h-6' />
    </button>
  );
}
