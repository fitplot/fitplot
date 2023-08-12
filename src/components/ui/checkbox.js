import * as React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { MinusIcon } from '@heroicons/react/24/solid';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=indeterminate]:bg-slate-900 data-[state=checked]:text-slate-50 data-[state=indeterminate]:text-slate-50 dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 dark:data-[state=checked]:bg-slate-50 dark:data-[state=indeterminate]:bg-slate-50 dark:data-[state=checked]:text-slate-900 dark:data-[state=indeterminate]:text-slate-900',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      {props.checked === 'indeterminate' && <MinusIcon className='h-3 w-3' />}
      {props.checked === true && <CheckIcon className='h-3 w-3' />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
