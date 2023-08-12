import React from 'react';
import {
  Cog8ToothIcon,
  HomeIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useWindowSize } from 'react-use';

import { Lockup } from '@/components/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SheetContent } from '@/components/ui/sheet';
import { getBuildId } from '@/lib/server';

const links = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    Icon: HomeIcon,
  },
  {
    title: 'Workouts',
    href: '/workouts',
    Icon: Squares2X2Icon,
  },
];

export default function SideBar({ user, close }) {
  const { width } = useWindowSize();

  const isCollapsed = React.useMemo(() => width >= 768, [width]);

  const [Comp, props] = React.useMemo(() => {
    let Comp = SheetContent;
    let props = {
      side: 'left',
    };

    if (isCollapsed) {
      Comp = 'aside';
      props = {};
    }

    return [Comp, props];
  }, [isCollapsed]);

  return (
    <Comp
      {...props}
      className={clsx('h-full w-[220px] p-0', { 'border-r': width > 512 })}
    >
      <nav className='flex h-full flex-col pb-16 pt-8'>
        <SidebarTopControls user={user} close={close} />
        <MainMenu links={links} close={close} />
        <div className='flex items-center gap-2 px-4 text-sm text-slate-400'>
          <Cog8ToothIcon className='h-4 w-4' />
          <span>Build {getBuildId()}</span>
        </div>
      </nav>
    </Comp>
  );
}

function SidebarTopControls({ user, close }) {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <Lockup />
      <ActiveUser user={user} close={close} />
      <Button
        href='/workouts?new'
        size='sm'
        variant='primary'
        className='justify-start gap-2'
        onClick={close}
      >
        Workout Now
      </Button>
    </div>
  );
}

function ActiveUser({ user, close }) {
  const router = useRouter();

  if (!Boolean(user)) return null;

  const initial = user.firstName ? user.firstName.slice(0, 1) : '';
  const active = router.pathname === '/me';

  return (
    <Button
      href='/me'
      size='sm'
      variant='ghost'
      className={clsx('justify-start gap-2', {
        'bg-slate-100 dark:bg-slate-800': active,
      })}
      onClick={close}
    >
      <Avatar className='h-6 w-6'>
        <AvatarFallback className='bg-primary-500 text-xs text-white'>
          {initial}
        </AvatarFallback>
      </Avatar>
      <span>{user.firstName}</span>
    </Button>
  );
}

function MainMenu({ links, close }) {
  const router = useRouter();

  return (
    <nav className='flex flex-1 flex-col px-4'>
      {links.map(({ title, href, Icon }, index) => {
        const active = router.pathname === href;

        return (
          <Button
            key={index}
            href={href}
            size='sm'
            variant='ghost'
            className={clsx('justify-start gap-2', {
              'bg-slate-100 dark:bg-slate-800': active,
            })}
            onClick={close}
          >
            {Icon && (
              <span>
                <Icon className='h-4 w-4' />
              </span>
            )}
            <span>{title}</span>
          </Button>
        );
      })}
    </nav>
  );
}
