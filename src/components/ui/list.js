import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const List = React.forwardRef(({ className, ...props }, ref) => (
  <div className='flex flex-col w-full overflow-auto'>
    <div
      ref={ref}
      className={cn('w-full text-sm divide-y divide-slate-100', className)}
      {...props}
    />
  </div>
));
List.displayName = 'List';

const ListGroupLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center gap-2 px-4 h-[44px] transition-colors bg-slate-50 dark:bg-slate-700',
      className
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
          'gap-2 flex items-center px-4 h-[44px] transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400',
          className
        )}
        {...props}
      />
    );
  }
);
ListItem.displayName = 'ListItem';

export { List, ListGroupLabel, ListItem };
