import dayjs from 'dayjs';
import Link from 'next/link';

import { Lockup } from '@/components/brand';
import { A, H4, Muted } from '@/components/typography';
import { Button } from '@/components/ui/button';

export function MarketingFooter() {
  return (
    <footer className='z-10 border-t border-border bg-white py-8'>
      <div className='flex flex-col mx-auto container px-2.5 lg:px-20 pt-10 gap-16 sm:gap-20 lg:gap-24'>
        <div className='grid gap-16 xl:grid-cols-5 xl:gap-0'>
          <div className='flex flex-col gap-8 xl:col-span-2'>
            <Link href='/' className='text-2xl lg:text-3xl'>
              <Lockup className='h-[1em]' />
            </Link>
            <Muted className='max-w-xs text-sm text-muted-foreground'>
              Notetaking built for fitness. Log your workouts and keep a pulse
              on progress.
            </Muted>
            <div className='flex items-center gap-2'>
              <Button variant='ghost' href='https://twitter.com/FitPlotApp'>
                TW
              </Button>
              <Button variant='ghost' href='https://instagram.com/FitPlotApp'>
                IG
              </Button>
              <Button variant='ghost' href='https://github.com/fitplot'>
                GH
              </Button>
            </div>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 xl:col-span-3'>
            <div className='flex flex-col gap-4'>
              <H4>Product</H4>
              <ul role='list' className='flex flex-col gap-4'>
                <li>
                  <A href=''>Features</A>
                </li>
                <li>
                  <A href=''>The FitPlot Method</A>
                </li>
                <li>
                  <A href='/waitlist'>Early Access</A>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <H4>Brand</H4>
              <ul role='list' className='flex flex-col gap-4'>
                <li>
                  <A href=''>Our Story</A>
                </li>
                <li>
                  <A href=''>Building the Brand</A>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <H4>Resources</H4>
              <ul role='list' className='flex flex-col gap-4'>
                <li>
                  <A href=''>FitCode&trade;</A>
                </li>
                <li>
                  <A href=''>Brand Kit</A>
                </li>
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <H4>Legal</H4>
              <ul role='list' className='flex flex-col gap-4'>
                <li>
                  <A href=''>Terms & Conditions</A>
                </li>
                <li>
                  <A href=''>Privacy Policy</A>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='border-t border-border pt-8'>
          <Muted>&copy; {dayjs().year()} FitPlot.io</Muted>
        </div>
      </div>
    </footer>
  );
}
