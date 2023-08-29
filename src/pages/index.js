import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import Head from 'next/head';
import Balancer from 'react-wrap-balancer';

import { MarketingLayout } from '@/components/layouts';
import { H1, H2, Lead, Paragraph } from '@/components/typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import withUser from '@/lib/with-user';

export default function Home({ user }) {
  const features = [
    {
      title: 'Log Your Workouts',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      className: 'md:col-span-2',
    },
    {
      title: 'Data is Progress',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      className: 'md:col-span-3',
    },
    {
      title: 'Progressive Overload',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      title: 'Open Source',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      className: 'md:col-span-3',
    },
    {
      title: 'Data Driven',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      className: 'md:col-span-2',
    },
  ];

  return (
    <>
      <Head>
        <title>FitPlot | Notetaking build for fitness.</title>
      </Head>
      <div className='flex flex-1 flex-col gap-20 md:gap-36 [&>*]:pb-28 [&>*]:pt-16'>
        <header className='flex flex-col items-center justify-center gap-6 text-center pt-28'>
          <Button
            variant='outline'
            href='https://github.com/fitplot/fitplot'
            className='rounded-full leading-loose gap-2'
          >
            Star us on GitHub
            <StarIcon className='w-4 h-4 text-yellow-400' />
          </Button>
          <H2 className='text-6xl font-extrabold tracking-tighter md:text-7xl'>
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              Track.{' '}
            </span>
            Transform. Triumph.
          </H2>
          <Lead className='leading-normal tracking-tight'>
            <Balancer>
              Never leave progress on the table. Track your fitness journey.
            </Balancer>
          </Lead>
          <div className='flex w-full flex-col gap-4 md:flex-row md:justify-center'>
            <Button
              size='lg'
              variant='secondary'
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
        </header>
        <section
          id='features'
          className='container mx-auto flex flex-col gap-6'
        >
          <H1 className='text-center text-5xl font-extrabold tracking-tighter md:text-6xl'>
            <Balancer>Notetaking built for fitness.</Balancer>
          </H1>
          <Lead className='text-center'>
            Log your workouts and keep a pulse on progress.
          </Lead>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-7 lg:grid-rows-2'>
            {features.map((feature) => (
              <HomeFeature key={feature.title} {...feature} />
            ))}
          </div>
        </section>
        <section className='container mx-auto flex flex-col items-center gap-6'>
          <H1 className='text-center text-5xl font-extrabold tracking-tighter md:text-6xl'>
            <Balancer>Our Story</Balancer>
          </H1>
          <Paragraph className='md:max-w-xl'>
            Did you hear the one about two gym bros who walk into the room?
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
            I&apos;m not sure exactly why we went back, but we did.For us, it
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
            benching 225 by August! We even graphed that shit.
            <br />
            <br />
            <b>FitPlot</b> is our notebook brought to life, so that you might
            experience the rush of excitement and love for the numbers that we
            share. This is our journey, together.
          </Paragraph>
        </section>
        <section className='flex flex-col gap-6'>
          <H1 className='text-center text-5xl font-extrabold tracking-tighter md:text-6xl '>
            <Balancer>FAQ</Balancer>
          </H1>
          <Accordion className='w-full md:mx-auto md:max-w-xl'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>FAQ One</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>FAQ Two</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>FAQ Three</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section id='waitlist'>
          <div className='container mx-auto flex flex-col gap-6'>
            <H1 className='text-5xl font-extrabold tracking-tighter md:text-6xl'>
              <Balancer>Early Access</Balancer>
            </H1>
            <Paragraph>Be the first to know.</Paragraph>
            <Paragraph>
              <Button size='lg' href='/waitlist' className='gap-2'>
                Join the Waitlist
                <ArrowRightIcon className='inline-block h-4 w-4' />
              </Button>
            </Paragraph>
          </div>
        </section>
        <section>
          <H1
            as='h2'
            className='mt-36 text-center text-4xl font-extrabold tracking-tighter md:text-6xl'
          >
            {/* TODO: rotate text: `on the court.` `at the track.` `at the finish line.` */}
            See you in the gym.
            <br />
            <span role='img' aria-label='face blowing a kiss'>
              💪
            </span>
          </H1>
        </section>
        <footer className='text-center'>
          <Paragraph>
            &copy; Copyright{' '}
            <a
              href='https://github.com/ayrock-dev'
              target='_blank'
              rel='noreferrer'
            >
              Eric Lee
            </a>{' '}
            {dayjs().year()}. All Rights Reserved.
          </Paragraph>
        </footer>
      </div>
    </>
  );
}

function HomeFeature({ title, className, description = '' }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      {description && (
        <CardContent>
          <Paragraph className='text-sm leading-loose'>{description}</Paragraph>
        </CardContent>
      )}
    </Card>
  );
}

Home.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
