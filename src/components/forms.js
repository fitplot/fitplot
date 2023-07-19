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
  const common =
    'md:text-lg md:font-medium placeholder:text-gray-500 disabled:text-gray-400';

  if (Boolean(props.icon)) {
    return (
      <div
        className={clsx(
          'flex items-center rounded border bg-white px-4 py-2 md:py-8 md:px-11',
          props.className
        )}
      >
        {props.icon}
        <input
          {...props}
          autoComplete='off'
          className={clsx('ml-4 focus:outline-none', common)}
          ref={ref}
        />
      </div>
    );
  }

  const style =
    'px-6 py-4 sm:px-11 sm:py-8 w-full rounded bg-slate-100 focus:outline-primary-500';

  if (props.type === 'textarea') {
    return (
      <textarea
        {...props}
        ref={ref}
        className={clsx(style, common, props.className)}
      />
    );
  }

  return (
    <input
      {...props}
      autoComplete='off'
      className={clsx(style, common, props.className)}
      ref={ref}
    />
  );
});

export { Input, Label };
