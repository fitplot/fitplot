import clsx from 'clsx';
import Link from 'next/link';

export default function Button({ children, href, className, ...props }) {
  const shared = {
    className: clsx('p-2 text-white bg-slate-900', { 'bg-slate-400 cursor-not-allowed': props.disabled }, className),
  };

  if (href)
    return (
      <Link href={href} {...shared} {...props}>
        {children}
      </Link>
    );

  return (
    <button type='button' {...shared} {...props}>
      {children}
    </button>
  );
}
