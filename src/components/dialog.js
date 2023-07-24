import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { H2 } from '@/components/typography';

export default function CustomDialog({
  title,
  open,
  onClose,
  initialFocus,
  children,
}) {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 overflow-y-auto'
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <div className='flex h-screen w-screen flex-col items-center justify-center px-4'>
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-in duration-300'
            enterFrom='opacity-0'
            leave='transition-opacity ease-out duration-200'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-slate-900 opacity-75' />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter='transition-all ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition-all ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='my-8 w-full transform overflow-hidden bg-slate-200 p-6 md:w-half-screen'>
              <Dialog.Title as='div' className='flex'>
                {title && <H2 className='grow'>{title}</H2>}
                <XMarkIcon
                  role='button'
                  onClick={onClose}
                  className='h-6 w-6'
                />
              </Dialog.Title>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
