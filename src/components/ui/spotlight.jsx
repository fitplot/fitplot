import React from 'react';

import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';

export function Spotlight({ className, ...props }) {
  const ref = React.useRef();
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={cn(
        `[--first:conic-gradient(from_90deg_at_80%_50%,_hsl(var(--background)),_hsl(var(--background)),_hsl(var(--primary)))]`,
        `[--second:conic-gradient(from_270deg_at_20%_50%,_hsl(var(--primary)),_hsl(var(--background)),_hsl(var(--background)))]`,
        `[--mask:radial-gradient(100%_50%_at_center_center,_#000,_transparent)]`,
        'flex -z-[1] [contain:layout]',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          '[background-image:var(--first),_var(--second)]',
          '[background-size:50%_100%,_50%_100%]',
          '[background-position-x:1%,_99%]',
          '[background-position-y:0,_0]',
          `[mask-image:var(--mask)]`,
          'bg-no-repeat w-full h-full transition-all opacity-50 dark:opacity-100 translate-y-[50%] duration-1000 origin-center pointer-events-none select-none translate-z-0',
          {
            'scale-[3] md:scale-[2] 2xl:scale-[1.55]': inView,
          },
        )}
      ></div>
    </div>
  );
}
