import clsx from 'clsx';

export default function Button({ children, className, ...props }) {
  return (
    <button className={clsx('bg-slate-900 text-white p-2', className)} {...props}>
      {children}
    </button>
  );
}
