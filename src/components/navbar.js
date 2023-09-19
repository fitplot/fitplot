import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Bars2Icon } from '@heroicons/react/24/solid';
import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWindowSize } from 'react-use';

import { Lockup, VerticalLockup } from '@/components/brand';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const contentAtom = atomWithReset(null);
contentAtom.debugLabel = 'NavbarContentAtom';
const titleAtom = atomWithReset(null);
titleAtom.debugLabel = 'NavbarTitleAtom';

export function MarketingNavbar({ user }) {
  return (
    <header className='z-40 fixed left-0 right-0 top-0 [--header-height:48px]'>
      <div className='after:absolute after:inset-x-0 after:-bottom-1/2 after:top-[-1px] after:backdrop-blur-md after:[mask-image:linear-gradient(to_bottom,black_var(--header-height),transparent)]' />
      <nav>
        <div className='container px-1 md:px-[2rem] relative flex gap-2 mx-auto items-center border-b [height:var(--header-height)]'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' className='md:hidden'>
                <Bars2Icon className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[220px] py-12 px-2'>
              <nav className='flex flex-1 flex-col gap-2 px-4'>
                <MarketingSidebarListItem title='Features' href='/#features' />
                <MarketingSidebarListItem
                  title='The FitPlot Method'
                  href='/#features'
                />
                <MarketingSidebarListItem
                  title='Early Access'
                  href='/waitlist'
                />
                <MarketingSidebarListItem title='Our Story' href='/' />
                <MarketingSidebarListItem title='Building The Brand' href='/' />
                <MarketingSidebarListItem title='Meet The Fam' href='/' />
                <MarketingSidebarListItem title='Brand Kit' href='/brand' />
              </nav>
            </SheetContent>
          </Sheet>
          <Link href='/'>
            <Lockup className='h-[1.5em] inline-flex' />
          </Link>
          <div className='md:flex md:flex-1 hidden'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>FitPlot</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-4 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                      <li className='row-span-3'>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/'
                            className='flex h-full w-full select-none flex-col gap-4 justify-end rounded-md bg-gradient-to-br from-primary/30 to-secondary/30 p-6 no-underline outline-none focus:shadow-md'
                          >
                            <div className='text-lg font-medium'>
                              <VerticalLockup className='inline-flex w-12' />
                            </div>
                            <p className='text-sm leading-tight'>
                              Notetaking built for fitness. Log your workouts
                              and keep a pulse on progress.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <MarketingNavbarListItem
                        href='/#features'
                        title='Introduction'
                      >
                        The new standard for fitness tracking.
                      </MarketingNavbarListItem>
                      <MarketingNavbarListItem
                        href='/#features'
                        title='The FitPlot Method'
                      >
                        Practice for progress.
                      </MarketingNavbarListItem>
                      <MarketingNavbarListItem
                        href='/waitlist'
                        title='Early Access'
                      >
                        First access to the app.
                      </MarketingNavbarListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                      <MarketingNavbarListItem title='Our Story' href='#'>
                        Did you hear the one about the two gym bros?
                      </MarketingNavbarListItem>
                      <MarketingNavbarListItem
                        title='Building the Brand'
                        href='#'
                      >
                        Get hyped for what&apos;s coming next.
                      </MarketingNavbarListItem>
                      <MarketingNavbarListItem title='Meet the Fam' href='#'>
                        Salud, mi familia.
                      </MarketingNavbarListItem>
                      <MarketingNavbarListItem title='Brand Kit' href='/brand'>
                        Assets and guidelines for presenting the FitPlot brand.
                      </MarketingNavbarListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuIndicator />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {Boolean(user) && (
            <Button
              href='/dashboard'
              variant='outline'
              size='sm'
              className='ml-auto gap-2'
            >
              App <ArrowRightIcon className='w-4' />
            </Button>
          )}
          {!Boolean(user) && (
            <Button
              href='/waitlist'
              variant='outline'
              size='sm'
              className='ml-auto gap-2'
            >
              <span className='sm:hidden'>Join</span>
              <span className='hidden sm:inline'>Early Access</span>
              <ArrowRightIcon className='w-4' />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

const MarketingNavbarListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
MarketingNavbarListItem.displayName = 'MarketingNavbarListItem';

const MarketingSidebarListItem = React.forwardRef(
  ({ className, href, title, Icon, ...props }, ref) => {
    const router = useRouter();
    const active = router.pathname === href;

    return (
      <Button
        size='sm'
        variant='ghost'
        href={href}
        className={cn(
          'justify-start gap-2',
          {
            'bg-accent': active,
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {Icon && (
          <span>
            <Icon className='h-4 w-4' />
          </span>
        )}
        <span>{title}</span>
      </Button>
    );
  },
);
MarketingSidebarListItem.displayName = 'MarketingSidebarListItem';

export function InAppNavbar() {
  const content = useAtomValue(contentAtom);
  const title = useAtomValue(titleAtom);

  const { width } = useWindowSize();
  const isCollapsed = React.useMemo(() => width < 768, [width]);

  return (
    <header className='flex min-h-[57px] items-center justify-between gap-2 border-b bg-background px-4'>
      {isCollapsed && (
        <SheetTrigger asChild>
          <Button variant='ghost'>
            <Bars2Icon className='h-6 w-6' />
          </Button>
        </SheetTrigger>
      )}
      <div className='flex items-center overflow-hidden text-sm'>{title}</div>
      <div className='ml-auto flex items-center'>{content}</div>
    </header>
  );
}

function RightContent({ children }) {
  const set = useSetAtom(contentAtom);
  const reset = useResetAtom(contentAtom);

  React.useEffect(() => {
    set(children);

    return () => reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
}

function Title({ children }) {
  const set = useSetAtom(titleAtom);
  const reset = useResetAtom(titleAtom);

  React.useEffect(() => {
    set(children);

    return () => reset();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return null;
}

const Navbar = {
  RightContent,
  Title,
};
export default Navbar;
