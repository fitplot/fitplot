import { BellIcon } from '@heroicons/react/24/outline';
import { CogIcon, UserIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { getBuildId } from '../../lib/server';
import { ListMenu, ListMenuItem } from '../list-menu';

const links = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Workouts',
    href: '/workouts',
  },
  {
    title: 'Exercises',
    href: '/exercises',
  },
];

export default function SideBar({ user, toggleMenu }) {
  const router = useRouter();

  const navigate = (to) => {
    router.push(to);
    toggleMenu();
  };

  return (
    <div className='fixed top-0 left-0 flex h-full w-9/12 flex-col overflow-y-auto bg-slate-100'>
      <HeaderBar user={user} navigate={navigate} className='shrink-0 grow-0' />
      <MainMenu navigate={navigate} className='my-4 grow' />
    </div>
  );
}

function HeaderBar({ user, navigate, className }) {
  return (
    <div className={clsx('flex h-12 justify-center border-b px-1', className)}>
      <ActiveUser user={user} navigate={navigate} className='grow' />
      <SideBarButton Icon={BellIcon} />
    </div>
  );
}

function ActiveUser({ user, navigate, className }) {
  return (
    <button
      type='button'
      className={clsx(
        'flex h-full items-center justify-center space-x-2',
        className
      )}
      onClick={() => navigate('/me')}
    >
      <UserIcon className='inline-block h-6 w-6' />
      <span>{user.firstName}</span>
    </button>
  );
}

function SideBarButton({ Icon, className, ...props }) {
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

function MainMenu({ className, navigate }) {
  return (
    <ListMenu className={clsx('divide-y', className)}>
      {links.map((link) => (
        <MainMenuLink key={link.title} navigate={navigate} {...link} />
      ))}
      <ListMenuItem className='space-x-2 bg-transparent text-slate-500'>
        <CogIcon className='h-6 w-6' />
        <span>Build {getBuildId()}</span>
      </ListMenuItem>
    </ListMenu>
  );
}

function MainMenuLink({ navigate, title, href }) {
  return (
    <ListMenuItem onClick={() => navigate(href)} className='bg-transparent'>
      {title}
    </ListMenuItem>
  );
}
