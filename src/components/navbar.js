import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import { usePageContextValues } from '@/components/layouts';
import { Button } from '@/components/ui/button';

export function MarketingNavbar({ user }) {
  return (
    <nav className='fixed flex h-[48px] w-full items-center justify-between px-8 backdrop-blur-md'>
      <Button variant='link' href='/' className='font-medium'>
        FitPlot
      </Button>
      <div className='flex'>
        <ul className='inline flex gap-4 rounded-full border bg-white px-6 md:gap-6'>
          <Button variant='link' href='/'>
            Home
          </Button>
          <Button variant='link' href='/#features'>
            Features
          </Button>
          {!user && (
            <Button variant='link' href='/waitlist'>
              Waitlist
            </Button>
          )}
        </ul>
      </div>
      <div className='flex'>
        {user ? (
          <Button href='/dashboard' variant='outline' size='sm'>
            Open App <ArrowRightIcon className='ml-2 inline-block h-4 w-4' />
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
