import React from 'react';
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import { Binary } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useMouseHovered } from 'react-use';
import Balancer from 'react-wrap-balancer';

import { MarketingFooter } from '@/components/footer';
import { MarketingLayout } from '@/components/layouts';
import {
  A,
  H1,
  H2,
  Lead,
  Paragraph,
  Typography,
} from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';
import withUser from '@/lib/with-user';

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>FitPlot | Notetaking built for fitness.</title>
      </Head>
      <div className='flex flex-col [&>*]:pb-28 [&>*]:pt-28 [&>*:first-child]:pt-36 md:[&>*:first-child]:pt-48'>
        <header className='container mx-auto flex flex-col items-center justify-center gap-6 text-center'>
          <H1 className='text-7xl lg:text-8xl'>
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              Track.{' '}
            </span>
            Transform. Triumph.
          </H1>
          <Lead className='leading-normal'>
            <Balancer>
              Never leave progress on the table. Track your fitness journey.
            </Balancer>
          </Lead>
          <div className='flex w-full flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button
              size='lg'
              variant='outline'
              href='/#features'
              className='gap-2'
            >
              Features
              <ArrowDownIcon className='w-4' />
            </Button>
            <Button
              size='lg'
              href={user ? '/dashboard' : '/waitlist'}
              className='gap-2'
            >
              {user ? 'Open App' : 'Join the waitlist'}
              <ArrowRightIcon className='w-4' />
            </Button>
          </div>
          <div className='w-full flex justify-center gap-4 pt-8 md:pt-20 md:px-20 flex-col md:flex-row relative'>
            <Card className='overflow-hidden shadow-xl hidden md:flex'>
              <Image
                width='1280'
                height='720'
                src='/dashboard-desktop.png'
                alt='A workout and its exercises.'
                className='select-none pointer-events-none'
                quality={100}
                priority
              />
            </Card>
            <div className='md:absolute md:inset-0 md:grid md:grid-cols-12'>
              <Phone className='md:col-start-8 md:col-span-3 md:self-end md:translate-y-8'>
                <Image
                  width='264'
                  height='533'
                  src='/workout-mobile.png'
                  alt='A workout and its exercises.'
                  className='select-none pointer-events-none w-full'
                  quality={100}
                  priority
                />
              </Phone>
            </div>
          </div>
        </header>
        <section
          id='features'
          className='container mx-auto flex flex-col gap-6 pt-48 relative'
        >
          <Spotlight className='absolute rotate-180 h-[450px] inset-x-0 top-0' />
          <H2 className='text-center text-5xl lg:text-6xl'>
            <Balancer>Notetaking built for fitness.</Balancer>
          </H2>
          <Lead className='text-center'>
            Log your workouts and keep a pulse on progress.
          </Lead>
          <div className='grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2 lg:grid-rows-2'>
            <HomeFeature title='Track Progress' className='group'>
              <div className='flex flex-col overflow-hidden gap-6 md:gap-8 md:group-hover:gap-2 transition-all'>
                <Paragraph>
                  Become your number one fan. Track your progress and never
                  leave progress on the table. See how far you&apos;ve come.
                </Paragraph>
                <Phone className='self-center'>
                  <Image
                    width='264'
                    height='533'
                    src='/workouts-mobile.png'
                    alt='A workout and its exercises.'
                    className='select-none pointer-events-none'
                    quality={100}
                  />
                </Phone>
              </div>
            </HomeFeature>
            <HomeFeature
              title='Save Time, Use FitCode&trade;'
              className='group'
            >
              <div className='flex flex-col overflow-hidden gap-6 md:gap-8 md:group-hover:gap-2 transition-all'>
                <Paragraph>
                  FitCode&trade; is shorthand; take notes the same way you would
                  with pen and paper and watch your notes auto-fill.{' '}
                  <Typography variant='a'>
                    <Link href='/fitcode'>Give it a try</Link>
                  </Typography>
                </Paragraph>
                <div className='self-center'>
                  <Image
                    width='512'
                    height='512'
                    src='/add-exercise-desktop.png'
                    alt='A workout and its exercises.'
                    className='rounded-lg overflow-hidden select-none pointer-events-none'
                    quality={100}
                  />
                </div>
              </div>
            </HomeFeature>
            <HomeFeature title='Progressive Overload'>
              <div className='flex flex-col gap-12 items-center'>
                <Paragraph>
                  FitPlot is designed to help you practice Progressive Overload,
                  a core axiom of the{' '}
                  <Typography variant='a' asChild>
                    <Link href='/method'>FitPlot Method</Link>
                  </Typography>
                  . Progressive Overload means you make progress every workout.
                  Another rep, another pound, another inch, another second off
                  your time.
                </Paragraph>
                <Image
                  width='462'
                  height='116'
                  src='/progressive-overload-desktop.png'
                  alt='A workout and its exercises.'
                  className='rounded-lg overflow-hidden select-none pointer-events-none'
                  quality={100}
                />
              </div>
            </HomeFeature>
            <HomeFeature title='Build Momentum' className='group relative'>
              <Paragraph className='w-3/4'>
                Visualize your workout routine. Nothing feels better than seeing
                your progress over time. Weeks, months, even a year in, see just
                how far you&apos;ve come.
              </Paragraph>
              <Phone className='absolute top-[50%] right-2 transition-all ease-out duration-300 translate-y-[-50%] translate-x-[50%] group-hover:translate-x-0'>
                <Image
                  width='264'
                  height='533'
                  src='/dashboard-mobile.png'
                  alt='A workout and its exercises.'
                  className='select-none pointer-events-none'
                  quality={100}
                />
              </Phone>
            </HomeFeature>
          </div>
        </section>
        <section className='container mx-auto flex flex-col items-center gap-6'>
          <H2 className='text-center text-5xl md:text-6xl'>
            <Balancer>Our Story</Balancer>
          </H2>
          <Paragraph className='md:max-w-xl'>
            Did you hear the one about two bros who walk into the gym?
            <br />
            <br />
            We&apos;re brothers &mdash; Eric and Justin &mdash; who love
            skateboarding, coding, and caffiene. Four years ago, after a few
            beers and a few too many motivational videos we decided we were
            going to the gym in the morning (heh, right?). Somehow we set our
            alarms, made coffee, and went.
            <br />
            <br />
            We didn&apos;t entirely know what we were doing, but we wrote down
            everything we did: bench press, incline bench, chest flys, tricep
            extentions, and Eric failed to do a pull-up.
            <br />
            <br />
            I&apos;m not sure exactly why we went back, but we did. For us, it
            wasn&apos;t some pump or euphoric runner&apos;s high. It was seeing
            the progress on paper: <b>the data</b>. We never stopped writing
            everything down. That journal was with us every day in the gym.{' '}
            <i>
              &quot;Last week I could only do this exercise for five reps, but
              today I just powered through <b>seven</b>!&quot;
            </i>
            <br />
            <br />
            Coders are dreamers. One late night conversation led to another and
            we were going full geek on our goals. If we added <i>x</i> reps per
            week, and every <i>y</i> weeks increase the weight, we&apos;ll be
            hitting our goals by August! We even graphed that shit.
            <br />
            <br />
            <b>FitPlot</b> is our notebook brought to life, so that you might
            experience the rush of excitement and love for the numbers that we
            share. This is our journey, together.
          </Paragraph>
        </section>
        <section
          id='waitlist'
          className='bg-gradient-to-br from-primary/30 to-secondary/30'
        >
          <div className='container mx-auto flex flex-col gap-6'>
            <H2 className='text-5xl md:text-6xl'>
              <Balancer>Early Access</Balancer>
            </H2>
            <Paragraph>Be the first to know.</Paragraph>
            <Paragraph>
              <Button size='lg' href='/waitlist' className='gap-2'>
                Join the Waitlist
                <ArrowRightIcon className='inline-block h-4 w-4' />
              </Button>
            </Paragraph>
          </div>
        </section>
        <section className='container mx-auto flex flex-col gap-6'>
          <H2 className='text-center text-5xl md:text-6xl '>
            <Balancer>FAQ</Balancer>
          </H2>
          <Accordion className='md:mx-auto md:max-w-xl'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>When is Early Access?</AccordionTrigger>
              <AccordionContent>
                FitPlot will be available to Early Access members early 2024.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>How much will FitPlot cost?</AccordionTrigger>
              <AccordionContent>
                Get started for free. Play around with it first. Pay for
                insights, add AI-based progressive overload coaching, and add
                your team later.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>
                What does it mean that FitPlot is open source?
              </AccordionTrigger>
              <AccordionContent>
                We have a passion for technology and really hope to inspire
                others. Most of the bits and bytes that make up FitPlot is open
                source - available for the community to explore and learn from.
                although not open contribution. The web needs more awesome open
                source examples.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section id='open-source' className='bg-accent'>
          <div className='container mx-auto flex flex-col gap-6 text-center items-center'>
            <H2 className='text-5xl lg:text-6xl'>
              <Balancer>
                Proudly{' '}
                <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                  Open-Source
                </span>
              </Balancer>
            </H2>
            <Paragraph className='md:max-w-md align-middle'>
              The{' '}
              <Binary
                aria-describedby='binary-bits'
                className='text-secondary inline-block w-[1.2em] h-[1.2em]'
              />{' '}
              <span id='binary-bits' className='sr-only'>
                binary bits
              </span>
              that make up FitPlot are open-source, which means our source is
              available for the community to explore and learn from. We are
              building our dreams, and hope to inspire others to do the same.
            </Paragraph>
            <Button
              variant='secondary'
              href='https://github.com/fitplot/fitplot'
              target='_blank'
              className='gap-2'
            >
              Star us on GitHub
              <StarIcon className='w-4 h-4 text-yellow-400' />
            </Button>
          </div>
        </section>
        <section className='container mx-auto flex flex-col gap-6 items-center'>
          <Typography variant='h3' className='text-center text-4xl lg:text-5xl'>
            See you in the gym.
          </Typography>
          <span
            className='text-4xl md:text-6xl'
            role='img'
            aria-label='flexing arm'
          >
            💪
          </span>
        </section>
        <MarketingFooter />
      </div>
    </>
  );
}

function HomeFeature({ title, className, children }) {
  const ref = React.useRef(null);
  const { elX, elY } = useMouseHovered(ref, {
    whenHovered: true,
  });

  return (
    <Card
      className={cn(
        "h-[450px] md:h-auto md:aspect-square bg-transparent border-none relative before:pointer-events-none before:select-none before:content-[''] before:z-[-1] before:absolute before:inset-[-1px] before:rounded-lg before:opacity-0 before:hover:opacity-100 transition-opacity duration-300 before:bg-[radial-gradient(1000px_circle_at_var(--x)_var(--y),_hsl(var(--primary)_/_50%)_0%,_hsl(var(--secondary)_/_50%)_25%,_transparent_80%)]",
        className,
      )}
      ref={ref}
      style={{ '--x': `${elX}px`, '--y': `${elY}px` }}
    >
      <div className='relative rounded-lg w-full h-full overflow-hidden bg-card/50 border hover:border-transparent'>
        {title && (
          <CardHeader className='pb-0 md:pb-6'>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className='text-sm md:text-base'>{children}</CardContent>
      </div>
    </Card>
  );
}

function Phone({ className, children }) {
  return (
    <div
      className={cn(
        'flex [--phone-bezel-thickness:8px] [--phone-border-radius:36px]',
        className,
      )}
    >
      <div className='flex-1 [padding:var(--phone-bezel-thickness)] bg-[#f6f9fc] [border-radius:var(--phone-border-radius)] shadow-[inset_0_2px_4px_0_rgb(0_0_0_/_0.05),0_20px_25px_-5px_rgb(0_0_0_/_0.1),_0_8px_10px_-6px_rgb(0_0_0_/_0.1)]'>
        <Card className='overflow-hidden border-none [border-radius:calc(var(--phone-border-radius)_-_var(--phone-bezel-thickness))]'>
          {children}
        </Card>
      </div>
    </div>
  );
}

Home.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
