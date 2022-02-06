import React from 'react';

import { useUser } from '../auth';
import Login from '../login';
import Nav from '../nav';

export default function Layout({ children }) {
  const { user } = useUser();

  return (
    <div className='flex overflow-hidden flex-col w-screen h-screen break-words bg-white md:flex-row-reverse'>
      <main className='flex overflow-auto flex-col flex-1 p-4'>{user ? children : <Login />}</main>
      <Nav />
    </div>
  );
}
