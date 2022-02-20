import clsx from 'clsx';
import React from 'react';
import { useToggle } from 'react-use';

import { useUser } from '../auth';
import Login from '../login';
import SideBar from '../sidebar';
import TopBar from '../topbar';

export default function Page({ children }) {
  const { user } = useUser();
  const [isMenuToggled, toggleMenu] = useToggle();

  return (
    <div className='overflow-hidden h-full'>
      <SideBar toggleMenu={() => toggleMenu()} />
      <div
        className={clsx(
          'flex overflow-hidden flex-col h-full break-words bg-white shadow-xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-3/4': isMenuToggled,
            'translate-x-0': !isMenuToggled,
          }
        )}
      >
        <TopBar onToggleMenu={() => toggleMenu()} />
        <main className='flex overflow-y-auto overscroll-none flex-col flex-1 p-4'>
          {user ? children : <Login />}
        </main>
      </div>
    </div>
  );
}
