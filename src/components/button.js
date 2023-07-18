import clsx from 'clsx';
import Link from 'next/link';

const variants = {
  default:
    'font-medium border bg-slate-100 hover:bg-slate-200 active:bg-info-300',
  primary: 'font-medium text-white bg-primary-500 hover:bg-primary-600',
  outline: 'border rounded',
};

const sizes = {
  default: 'px-4 py-3',
  sm: 'text-sm px-2 py-1',
  lg: 'text-lg font-medium py-8 px-11',
};

export default function Button({
  children,
  href,
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}) {
  const shared = {
    className: clsx(
      'text-center disabled:bg-slate-100 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      {
        rounded: className && !className.includes('rounded'),
      },
      className
    ),
  };

  if (href)
    return (
      <Link href={href} {...shared} {...props}>
        {children}
      </Link>
    );

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      {...shared}
      {...props}
    >
      {children}
    </button>
  );
}
