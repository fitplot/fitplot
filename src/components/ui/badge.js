import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-800',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80',
        primary:
          'border-transparent bg-primary-500 text-primary-50 hover:bg-primary-100/80 dark:bg-primary-800 dark:text-primary-50 dark:hover:bg-primary-800/80',
        secondary:
          'border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-100/80 dark:bg-secondary-800 dark:text-secondary-50 dark:hover:bg-secondary-800/80',
        destructive:
          'border-transparent bg-destructive-500 text-slate-50 hover:bg-destructive-500/80 dark:bg-destructive-900 dark:text-destructive-50 dark:hover:bg-destructive-900/80',
        outline: 'text-slate-950 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
