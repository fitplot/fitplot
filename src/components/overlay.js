import { Dialog } from '@headlessui/react';

import { H2 } from './typography';

export default function Overlay({ title, open, onClose, initialFocus, children }) {
  return (
    <Dialog
      as='div'
      className='flex flex-col w-full h-full'
      open={open}
      onClose={onClose}
      initialFocus={initialFocus}
    >
      <div className=''>{title && <Dialog.Title as={H2}>{title}</Dialog.Title>}</div>
      {children}
    </Dialog>
  );
}
