import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import Balancer from 'react-wrap-balancer';

import { MarketingLayout } from '@/components/layouts';
import { H1, Paragraph } from '@/components/typography';
import withUser from '@/lib/with-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className='flex flex-1 flex-col gap-20 md:gap-36'>
      <header className='flex flex-col items-center justify-center gap-6 pt-28 text-center'>
        <Button
          variant='outline'
          href='https://github.com/nexus-fitness/nexus'
          className='rounded-full leading-loose'
        >
          Star us on GitHub
          <StarIcon className='inline-block w-6 pl-2 text-yellow-500' />
        </Button>
        <H1 className='max-w-full text-6xl font-extrabold tracking-tighter md:text-7xl'>
          <span className='bg-gradient-to-r from-primary-400 to-secondary-600 bg-clip-text text-transparent'>
            Track.{' '}
          </span>
          Transform. Triumph.
        </H1>
        <Paragraph
          className='leading-normal tracking-tight'
          variant='secondary'
        >
          <Balancer>
            Never leave progress on the table. Track your fitness journey.
          </Balancer>
        </Paragraph>
        <div className='flex w-full flex-col gap-4 md:flex-row md:justify-center'>
          <Button size='lg' variant='secondary' href='#features'>
            Features
            <ArrowDownIcon className='inline-block w-6 pl-2' />
          </Button>
          <Button
            size='lg'
            variant='primary'
            href={user ? '/dashboard' : '/waitlist'}
          >
            {user ? 'Open App' : 'Join the waitlist'}
            <ArrowRightIcon className='inline-block w-6 pl-2' />
          </Button>
        </div>
      </header>
      <section id='features' className='container mx-auto flex flex-col gap-6'>
        <H1 className='text-center text-5xl font-extrabold tracking-tighter md:text-6xl'>
          <Balancer>Notetaking built for fitness.</Balancer>
        </H1>
        <Paragraph className='text-center'>
          Log your workouts and keep a pulse on progress.
        </Paragraph>
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
          skateboarding, coding, and caffiene. Four years ago, after a few beers
          and a few too many motivational videos we decided we were going to the
          gym in the morning (lol, right?). Somehow we set our alarms, made
          coffee, and went.
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
          Coders are dreamers. One late night conversation led to another and we
          were going full geek on our goals. If we added <i>x</i> reps per week,
          and every <i>y</i> weeks increase the weight, we&apos;ll be benching
          225 by August! We even graphed that shit.
          <br />
          <br />
          <b>FitPlot</b> is our notebook brought to life, so that you might
          experience the rush of excitement and love for the numbers that we
          share. This is our journey, together.
        </Paragraph>
      </section>
      <section className='flex flex-col gap-6 text-center'>
        <H1 className='text-5xl font-extrabold tracking-tighter md:text-6xl'>
          <Balancer>FAQ</Balancer>
        </H1>
        <Paragraph>Coming Soon&trade;</Paragraph>
      </section>
      <section className='-mx-4  bg-secondary-500 px-4 py-28 text-white'>
        <div className='container mx-auto flex flex-col gap-6'>
          <H1 className='text-5xl font-extrabold tracking-tighter text-white md:text-6xl'>
            <Balancer>Waitlist</Balancer>
          </H1>
          <Paragraph>Be the first to know.</Paragraph>
          <Button
            size='lg'
            variant='primary'
            href='/waitlist'
            className='w-full'
          >
            Join the Waitlist{' '}
            <ArrowRightIcon className='inline-block h-6 w-6' />
          </Button>
        </div>
      </section>
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
      <footer className='my-8 text-center'>
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
