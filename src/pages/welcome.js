import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

import { usePageContext } from '@/components/layouts';
import { H3, Paragraph } from '@/components/typography';
import { Button } from '@/components/ui/button';

export default function Welcome() {
  usePageContext({ title: 'Welcome ' });

  const router = useRouter();
  const [theme, setTheme] = React.useState('light');

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <div className='flex flex-col gap-8 text-center md:max-w-xl'>
        <H3 as='h1'>Choose your style</H3>
        <Paragraph>
          You can change your mind later in your preferences.
        </Paragraph>
        <fieldset className='flex overflow-hidden rounded-lg border'>
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
      className={clsx('flex flex-1 flex-col items-center justify-center p-6', {
        'bg-slate-100': isSelected,
        'cursor-pointer bg-white hover:bg-slate-50': !isSelected,
      })}
    >
      <input
        id={id}
        type='radio'
        name={name}
        value={value}
        className='invisible h-0 w-0'
        onChange={onChange}
      />
      <div className='flex flex-col gap-2'>
        <div
          className={clsx(bgColor, 'h-12 w-12 rounded-full border-4', {
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

export { default as getServerSideProps } from '../lib/with-user';
