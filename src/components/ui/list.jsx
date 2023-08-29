import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const List = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full flex-col divide-y divide-border overflow-auto text-sm',
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
      'flex h-[44px] items-center gap-2 bg-accent px-4 transition-colors',
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
          'flex h-[44px] items-center gap-2 px-4 transition-colors hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring data-[state=selected]:bg-accent',
          className,
        )}
        {...props}
      />
    );
  },
);
ListItem.displayName = 'ListItem';

export { List, ListGroupLabel, ListItem };
