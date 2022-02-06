import clsx from 'clsx';
import React from 'react';

function Label({ className, ...labelProps }) {
  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <label className={clsx('inline-block text-lg text-gray-500', className)} {...labelProps} />
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}

const Input = React.forwardRef((properties, reference) => {
  const className = clsx(
    'py-8 px-11 w-full text-lg font-medium text-black placeholder:text-gray-500 disabled:text-gray-400 bg-gray-100',
    properties.className
  );

  if (properties.type === 'textarea') {
    return <textarea {...properties} className={className} />;
  }

  return <input {...properties} className={className} ref={reference} />;
});

export { Input, Label };
