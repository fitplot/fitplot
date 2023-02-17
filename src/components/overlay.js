import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { H6 } from './typography';

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
        <div className='flex overflow-hidden flex-col w-full h-full divide-y'>
          <Dialog.Title
            as='div'
            className='flex relative grow-0 shrink-0 justify-center items-stretch h-12 text-lg'
          >
            <div className='flex flex-1 items-center' />
            <H6
              as='h2'
              className='flex flex-1 justify-center items-center whitespace-nowrap'
            >
              {title}
            </H6>
            <div className='flex flex-1 justify-end items-center'>
              <button
                type='button'
                className='px-4 h-full font-medium'
                onClick={onClose}
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>
          </Dialog.Title>
          <div className='flex overflow-y-auto flex-col grow'>{children}</div>
        </div>
      </Dialog>
    </Transition>
  );
}
