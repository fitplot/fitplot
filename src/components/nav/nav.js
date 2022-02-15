import { CreditCardIcon, PlayIcon, PlusIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();

  const links = [
    {
      title: 'Workout',
      href: '/workout',
      Icon: PlayIcon,
    },
    {
      title: 'Checkin',
      href: '/checkin',
      Icon: CreditCardIcon,
    },
    {
      title: 'Wellness',
      href: '/club',
      Icon: PlusIcon,
    },
    {
      title: 'Profile',
      href: '/profile',
      Icon: UserCircleIcon,
    },
  ];

  return (
    <ul className='flex text-xs text-white bg-slate-900 md:flex-col md:p-2' role='tree'>
      {links.map(({ title, href, Icon }) => (
        <div className='flex flex-1 md:flex-initial' key={title}>
          {/* NOTE: `h-12` below must be perfectly offset by a bottom margin of the Layout component */}
          <button
            type='button'
            className='flex flex-col flex-1 justify-center items-center h-12 hover:bg-slate-800 md:rounded-full'
            onClick={() => router.push(href)}
          >
            {Icon && <Icon className='w-5 h-5 md:w-12 md:h-12' />}
            <span className='md:sr-only'>{title}</span>
          </button>
        </div>
      ))}
    </ul>
  );
}
