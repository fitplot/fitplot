import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const List = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full flex-col divide-y divide-slate-100 overflow-auto text-sm',
      className,
    )}
    {...props}
  />
));
List.displayName = 'List';

const ListGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-[44px] items-center gap-2 bg-slate-50 px-4 transition-colors dark:bg-slate-700',
      className,
    )}
    {...props}
  />
));
ListGroupLabel.displayName = 'ListGroupLabel';

const ListItem = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : props.href ? Link : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex h-[44px] items-center gap-2 px-4 transition-colors hover:bg-slate-100/50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800',
          className,
        )}
        {...props}
      />
    );
  },
);
ListItem.displayName = 'ListItem';

export { List, ListGroupLabel, ListItem };
