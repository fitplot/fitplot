import clsx from 'clsx';
import React from 'react';

import Button from '../button';
import { usePageContext } from '../page';
import { H3, Paragraph } from '../typography';
import { useRouter } from 'next/router';

export default function Welcome() {
  usePageContext({ title: 'Welcome ' });

  const router = useRouter();
  const [theme, setTheme] = React.useState('light');

  return (
    <div className='flex-1 items-center justify-center flex flex-col'>
      <div className='flex flex-col gap-8 md:max-w-xl text-center'>
        <H3 as='h1'>Choose your style</H3>
        <Paragraph>
          You can change your mind later in your preferences.
        </Paragraph>
        <fieldset className='flex rounded-lg border overflow-hidden'>
          <legend className='sr-only'>Select a theme</legend>
          <ThemeToggle
            value='light'
            label='Light'
            name='theme'
            isSelected={theme === 'light'}
            onChange={(e) => setTheme(e.target.value)}
            bgColor='bg-slate-50'
          />
          <ThemeToggle
            value='dark'
            label='Dark'
            name='theme'
            isSelected={theme === 'dark'}
            onChange={(e) => setTheme(e.target.value)}
            bgColor='bg-slate-800'
          />
        </fieldset>
        <Button variant='primary' onClick={() => router.replace('/dashboard')}>
          Open FitPlot
        </Button>
      </div>
    </div>
  );
}

function ThemeToggle({ value, label, name, isSelected, onChange, bgColor }) {
  const id = `theme-${value}`;

  return (
    <label
      htmlFor={id}
      className={clsx('flex-1 flex flex-col p-6 items-center justify-center', {
        'bg-slate-100': isSelected,
        'bg-white cursor-pointer hover:bg-slate-50': !isSelected,
      })}
    >
      <input
        id={id}
        type='radio'
        name={name}
        value={value}
        className='invisible w-0 h-0'
        onChange={onChange}
      />
      <div className='flex flex-col gap-2'>
        <div
          className={clsx(bgColor, 'w-12 h-12 rounded-full border-4', {
            'border-emerald-600': isSelected,
          })}
        >
          <span className='sr-only'>{label} theme preview</span>
        </div>
        <span className='font-medium'>{label}</span>
      </div>
    </label>
  );
}
