import clsx from 'clsx';
import Link from 'next/link';

const variants = {
  default: 'bg-slate-200 hover:bg-slate-300',
  primary: 'text-white bg-emerald-700 hover:bg-emerald-800',
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
