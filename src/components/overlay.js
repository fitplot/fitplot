import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { H6 } from '@/components/typography';

export default function Overlay({
  title,
  open,
  onClose,
  initialFocus,
  children,
}) {
  return (
    <Transition
      appear
      show={open}
      as={React.Fragment}
      enter='ease-out duration-300'
      enterFrom='translate-y-full'
      enterTo='translate-y-0'
      leave='ease-in duration-200'
      leaveFrom='translate-y-0'
      leaveTo='translate-y-full'
    >
      <Dialog
        as='div'
        className='fixed inset-0 bg-slate-50'
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <div className='flex h-full w-full flex-col divide-y overflow-hidden'>
          <Dialog.Title
            as='div'
            className='relative flex h-12 shrink-0 grow-0 items-stretch justify-center text-lg'
          >
            <div className='flex flex-1 items-center' />
            <H6
              as='h2'
              className='flex flex-1 items-center justify-center whitespace-nowrap'
            >
              {title}
            </H6>
            <div className='flex flex-1 items-center justify-end'>
              <button
                type='button'
                className='h-full px-4 font-medium'
                onClick={onClose}
              >
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
          </Dialog.Title>
          <div className='flex grow flex-col overflow-y-auto'>{children}</div>
        </div>
      </Dialog>
    </Transition>
  );
}
