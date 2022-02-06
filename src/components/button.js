import clsx from 'clsx';

export default function Button({ children, className, ...properties }) {
  return (
    <button
      type='button'
      className={clsx('p-2 text-white bg-slate-900', className)}
      {...properties}
    >
      {children}
    </button>
  );
}
