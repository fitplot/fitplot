import { Dialog as DialogComponent, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React from 'react';

import { H2 } from './typography';

export default function Dialog({ title, open, onClose, initialFocus, children }) {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <DialogComponent
        as='div'
        className='overflow-y-auto fixed inset-0'
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <div className='flex flex-col justify-center items-center px-4 w-screen h-screen'>
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-in duration-300'
            enterFrom='opacity-0'
            leave='transition-opacity ease-out duration-200'
            leaveTo='opacity-0'
          >
            <DialogComponent.Overlay className='fixed inset-0 bg-slate-900 opacity-75' />
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
            {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
            <div className='overflow-hidden p-6 my-8 w-full bg-white transform md:w-half-screen'>
              <DialogComponent.Title as='div' className='flex'>
                {title && <H2 className='grow'>{title}</H2>}
                <XIcon role='button' onClick={onClose} className='w-8 h-8' />
              </DialogComponent.Title>
              {children}
            </div>
          </Transition.Child>
        </div>
      </DialogComponent>
    </Transition>
  );
}
