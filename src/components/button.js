import clsx from 'clsx';
import Link from 'next/link';

const variants = {
  default:
    'border border-slate-500 bg-gradient-to-br from-slate-100 to-slate-300 hover:bg-slate-300 active:bg-info-300',
  primary: 'text-white bg-primary-500 hover:bg-primary-800',
};

export default function Button({
  children,
  href,
  className,
  variant = 'default',
  type = 'button',
  ...props
}) {
  const shared = {
    className: clsx(
      'px-4 py-3 font-medium',
      variants[variant],
      {
        'bg-slate-100 cursor-not-allowed': props.disabled,
        rounded: className && !className.includes('rounded'),
      },
      className,
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
