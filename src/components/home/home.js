import {
  ArrowDownIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ChartBarIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Balancer from 'react-wrap-balancer';

import Button from '../button';
import { usePageContext } from '../page';
import { H1, H3, Paragraph } from '../typography';

export default function Home() {
  usePageContext({ title: 'FitPlot' });

  const features = [
    {
      title: 'Log Your Workouts',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: <PencilSquareIcon className='w-6 inline-block' />,
      className: 'md:col-span-2',
    },
    {
      title: 'Data is Progress',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: <ChartBarIcon className='w-6 inline-block' />,
      className: 'md:col-span-3',
    },
    {
      title: 'Progressive Overload',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: <ChartBarIcon className='w-6 inline-block' />,
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      title: 'Open Source',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: <BookOpenIcon className='w-6 inline-block' />,
      className: 'md:col-span-3',
    },
    {
      title: 'Open Source',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: <BookOpenIcon className='w-6 inline-block' />,
      className: 'md:col-span-2',
    },
  ];

  return (
    <div className='flex-1 flex flex-col gap-20 md:gap-36'>
      <header className='flex flex-col items-center justify-center gap-6 pt-28 text-center'>
        <Button
          href='https://github.com/nexus-fitness/nexus'
          className='flex justify-center rounded-full py-0 leading-loose border border-slate-300 text-sm'
        >
          Star us on GitHub
          <StarIcon className='w-6 pl-2 inline-block text-yellow-500' />
        </Button>
        <H1 className='text-6xl md:text-7xl tracking-tighter font-extrabold'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-700'>
            Track.
          </span>{' '}
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
        <div className='flex flex-col w-full gap-4 md:flex-row md:justify-center'>
          <Button href='#features' className='block'>
            Features
            <ArrowDownIcon className='inline-block pl-2 w-6' />
          </Button>
          <Button
            variant='primary'
            className='block flex justify-center'
            href='/waitlist'
          >
            Join the waitlist
            <ArrowRightIcon className='inline-block pl-2 w-6' />
          </Button>
        </div>
      </header>
      <section
        id='features'
        className='flex flex-col container mx-auto gap-6 text-center'
      >
        <H1 className='text-5xl md:text-6xl tracking-tighter font-extrabold'>
          <Balancer>Notetaking built for fitness.</Balancer>
        </H1>
        <Paragraph>Log your workouts and keep a pulse on progress.</Paragraph>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-7 lg:grid-rows-2'>
          {features.map((feature) => (
            <HomeFeature {...feature} />
          ))}
        </div>
      </section>
      <section className='flex flex-col container mx-auto items-center gap-6'>
        <H1 className='text-5xl md:text-6xl tracking-tighter font-extrabold text-center'>
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
          everything we did: incline bench, bench, fly&apos;s, tricep
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
        <H1 className='text-5xl md:text-6xl tracking-tighter font-extrabold'>
          <Balancer>FAQ</Balancer>
        </H1>
        <Paragraph>Coming Soon&trade;</Paragraph>
      </section>
      <h1 className='mt-36 text-center text-4xl font-extrabold tracking-tighter md:text-6xl'>
        {/* TODO: rotate text: `on the court.` `at the track.` `at the finish line.` */}
        See you in the gym.
        <br />
        <span role='img' aria-label='face blowing a kiss'>
          💪
        </span>
      </h1>
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

function HomeFeature({ title, className, icon = null, description = '' }) {
  return (
    <div
      className={clsx(
        className,
        'text-left bg-gradient-to-br flex flex-col gap-4 bg-slate-100 border rounded from-slate-50 to-slate-100 p-8',
      )}
    >
      {icon && <span className='pr-2'>{icon}</span>}
      <H3 as='h2' className=' font-extrabold'>
        {title}
      </H3>

      {description && (
        <Paragraph className='text-sm leading-loose'>{description}</Paragraph>
      )}
    </div>
  );
}
