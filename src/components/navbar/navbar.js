import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { usePageContextValues } from '../layouts';
import Link from 'next/link';
import Button from '../button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function MarketingNavbar({ user }) {
  return (
    <nav className='fixed flex h-[48px] w-full items-center px-8 backdrop-blur-md'>
      <Link href='/' className='font-medium'>
        FitPlot
      </Link>
      <div className='flex flex-1 justify-center'>
        <ul className='inline flex gap-4 rounded-full border bg-white px-6 py-1 md:gap-6'>
          <Link href='/'>Home</Link>
          <Link href='/#features'>Features</Link>
          {!user && <Link href='/waitlist'>Waitlist</Link>}
        </ul>
      </div>
      <div className='flex'>
        {user ? (
          <Button href='/dashboard' variant='outline' size='sm'>
            App <ArrowRightIcon className='ml-2 inline-block h-4 w-4' />
          </Button>
        ) : (
          <Button href='/waitlist' variant='outline' size='sm'>
            Waitlist
            <ArrowRightIcon className='ml-2 inline-block h-4 w-4' />
          </Button>
        )}
      </div>
    </nav>
  );
}

export function InAppNavbar({ noop, onToggleMenu }) {
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
