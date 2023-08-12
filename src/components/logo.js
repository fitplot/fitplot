import { useRouter } from 'next/router';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';

export function Logo(props) {
  const router = useRouter();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <svg
          version='1.1'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          {/* black */}
          <path
            d='m291.01 554.52q0.02-0.26 0.07-0.5 11.57-56.92 23.75-113.7 0.45-2.08 2.07-3.42c78.06-64.54 156.1-129.08 234.29-193.43a0.22 0.22 0 0 1 0.36 0.22q-12.09 58.82-24.96 117.39c-0.83 3.77-3.46 5.54-6.36 7.9-76.57 62.44-152.94 125.14-229.55 187.54q-0.91 0.75-0.38-0.3l0.52-1q0.16-0.33 0.19-0.7z'
            fill='#000000'
          />
          {/* violet-500 */}
          <path
            d='m760.16 269.23-26.24 120.13q-0.11 0.52-0.62 0.94l-445.45 361.83a0.52 0.52 0 0 1-0.83-0.57q0.96-2.98 1.63-6.23 11.3-54.96 23.1-109.81c0.86-3.99 4.46-5.58 7.31-7.91q219.93-179.48 440.58-358.74a0.35 0.32 77.9 0 1 0.52 0.36z'
            fill='#8b5cf6'
          />
          {/* cyan-400 */}
          <path
            d='m490.55 781.98 25.38-119.7q0.09-0.42 0.49-0.75l237.1-192.76a0.39 0.35-15.2 0 1 0.62 0.32l-26.35 121.14a0.76 0.73-15.6 0 1-0.25 0.42l-236.45 191.66a0.34 0.33 76.2 0 1-0.54-0.33z'
            fill='#22d3ee'
          />
        </svg>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => router.push('/brand')}>
          Brand Guidelines
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function MonochromeLogo(props) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <svg
          version='1.1'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
          className='fill-current'
          {...props}
        >
          <path d='m291.01 554.52q0.02-0.26 0.07-0.5 11.57-56.92 23.75-113.7 0.45-2.08 2.07-3.42c78.06-64.54 156.1-129.08 234.29-193.43a0.22 0.22 0 0 1 0.36 0.22q-12.09 58.82-24.96 117.39c-0.83 3.77-3.46 5.54-6.36 7.9-76.57 62.44-152.94 125.14-229.55 187.54q-0.91 0.75-0.38-0.3l0.52-1q0.16-0.33 0.19-0.7z' />
          <path d='m760.16 269.23-26.24 120.13q-0.11 0.52-0.62 0.94l-445.45 361.83a0.52 0.52 0 0 1-0.83-0.57q0.96-2.98 1.63-6.23 11.3-54.96 23.1-109.81c0.86-3.99 4.46-5.58 7.31-7.91q219.93-179.48 440.58-358.74a0.35 0.32 77.9 0 1 0.52 0.36z' />
          <path d='m490.55 781.98 25.38-119.7q0.09-0.42 0.49-0.75l237.1-192.76a0.39 0.35-15.2 0 1 0.62 0.32l-26.35 121.14a0.76 0.73-15.6 0 1-0.25 0.42l-236.45 191.66a0.34 0.33 76.2 0 1-0.54-0.33z' />
        </svg>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => router.push('/brand')}>
          Brand Guidelines
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function Wordmark({ className, ...props }) {
  return (
    <span className={cn('font-bold tracking-tight', className)} {...props}>
      FitPlot
    </span>
  );
}

export function Lockup({ className, ...props }) {
  return (
    <div className={cn('flex flex items-center', className)} {...props}>
      <Logo className='w-[2em]' />
      <Wordmark className='-ml-[0.25em]' />
    </div>
  );
}

export function VerticalLockup({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}
    >
      <Logo className='w-[6em]' />
      <Wordmark className='block -mt-[1em]' />
    </div>
  );
}
