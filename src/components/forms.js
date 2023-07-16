import clsx from 'clsx';
import React from 'react';

function Label({ className, ...labelProps }) {
  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <label
      className={clsx('inline-block text-lg text-slate-500', className)}
      {...labelProps}
    />
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}

const Input = React.forwardRef(function Input(props, ref) {
  const className = clsx(
    'py-8 px-11 w-full text-lg font-medium placeholder:text-gray-500 disabled:text-gray-400 bg-slate-100',
    props.className
  );

  if (props.type === 'textarea') {
    return <textarea {...props} className={className} />;
  }

  return (
    <input {...props} autoComplete='off' className={className} ref={ref} />
  );
});

export { Input, Label };
