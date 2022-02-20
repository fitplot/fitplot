import { BellIcon } from '@heroicons/react/outline';
import { CogIcon, UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { getBuildId } from '../../lib/server';
import { useUser } from '../auth';
import { ListMenu, ListMenuItem } from '../list-menu';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Workout',
    href: '/workout',
  },
];

export default function SideBar({ toggleMenu }) {
  const router = useRouter();

  const navigate = (to) => {
    router.push(to);
    toggleMenu();
  };

  return (
    <div className='flex overflow-y-auto fixed top-0 left-0 flex-col w-9/12 h-full bg-slate-100'>
      <HeaderBar className='grow-0 shrink-0' />
      <MainMenu className='grow my-4' navigate={navigate} />
    </div>
  );
}

function HeaderBar({ className }) {
  return (
    <div className={clsx('flex justify-center px-1 h-12 border-b', className)}>
      <ActiveUser className='grow' />
      <SideBarButton Icon={BellIcon} />
    </div>
  );
}

function ActiveUser({ className }) {
  const { user } = useUser();

  return (
    <button
      type='button'
      className={clsx('flex justify-center items-center space-x-2 h-full', className)}
    >
      <UserIcon className='w-6 h-6' />
      <span>{user ? user.username : 'WHO?'}</span>
    </button>
  );
}

function SideBarButton({ Icon, className, ...props }) {
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

function MainMenu({ className, navigate }) {
  return (
    <ListMenu className={clsx('divide-y', className)}>
      {links.map((link) => (
        <MainMenuLink key={link.title} navigate={navigate} {...link} />
      ))}
      <ListMenuItem className='space-x-2 text-slate-500'>
        <CogIcon className='w-6 h-6' />
        <span>Build {getBuildId()}</span>
      </ListMenuItem>
    </ListMenu>
  );
}

function MainMenuLink({ navigate, title, href }) {
  return (
    <ListMenuItem onClick={() => navigate(href)} className='font-medium'>
      {title}
    </ListMenuItem>
  );
}
