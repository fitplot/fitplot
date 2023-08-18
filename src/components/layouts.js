import React from 'react';
import { useToggle } from 'react-use';

import AddSetsDialog from '@/components/dialogs/add-sets-dialog';
import AddWorkoutDialog from '@/components/dialogs/add-workout-dialog';
import DeleteSetsDialog from '@/components/dialogs/delete-sets-dialog';
import DeleteWorkoutDialog from '@/components/dialogs/delete-workout-dialog';
import GlobalCommand from '@/components/global-command';
import { InAppNavbar, MarketingNavbar } from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { Sheet } from '@/components/ui/sheet';

export function MarketingLayout({ children, user }) {
  return <MarketingPage user={user}>{children}</MarketingPage>;
}

function MarketingPage({ children, user }) {
  return (
    <>
      <MarketingNavbar user={user} />
      <main className='px-4'>{children}</main>
    </>
  );
}

export function InAppLayout({ children, user }) {
  return (
    <>
      <InAppPage user={user}>{children}</InAppPage>
      <GlobalCommand />
      <AddWorkoutDialog />
      <AddSetsDialog />
      <DeleteSetsDialog />
      <DeleteWorkoutDialog />
    </>
  );
}

function InAppPage({ children, user }) {
  const [open, setOpen] = useToggle(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className='flex h-full flex-col overflow-hidden overscroll-none md:flex-row'>
        <SideBar user={user} close={() => setOpen(false)} />
        <div className='flex flex-1 flex-col overflow-hidden overscroll-none break-words bg-white'>
          <InAppNavbar />
          <main className='flex flex-1 flex-col overflow-auto overscroll-none'>
            {children}
          </main>
        </div>
      </div>
    </Sheet>
  );
}
