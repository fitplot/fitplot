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
    <div className='flex overflow-y-auto fixed top-0 left-0 flex-col w-9/12 h-full bg-slate-100'>
      <HeaderBar user={user} navigate={navigate} className='grow-0 shrink-0' />
      <MainMenu navigate={navigate} className='grow my-4' />
    </div>
  );
}

function HeaderBar({ user, navigate, className }) {
  return (
    <div className={clsx('flex justify-center px-1 h-12 border-b', className)}>
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
        'flex justify-center items-center space-x-2 h-full',
        className,
      )}
      onClick={() => navigate('/me')}
    >
      <UserIcon className='inline-block w-6 h-6' />
      <span>{user.firstName}</span>
    </button>
  );
}

function SideBarButton({ Icon, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        'flex justify-center items-center w-10 h-full',
        className,
      )}
      type='button'
    >
      <Icon className='w-6 h-6' />
    </button>
  );
}

function MainMenu({ className, navigate }) {
  return (
    <ListMenu className={clsx('divide-y', className)}>
      {links.map((link) => (
        <MainMenuLink key={link.title} navigate={navigate} {...link} />
      ))}
      <ListMenuItem className='space-x-2 text-slate-500 bg-transparent'>
        <CogIcon className='w-6 h-6' />
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
