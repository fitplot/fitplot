import React from 'react';

const Input = React.forwardRef(function Input(
    props,
    ref,
  ) {
    const className = `placeholder-gray-500 dark:disabled:text-blueGray-500 focus-ring px-11 py-8 w-full text-black disabled:text-gray-400 dark:text-white text-lg font-medium bg-gray-100 dark:bg-gray-800 ${props.className}`;
  
    if (props.type === 'textarea') {
      return (
        <textarea
          {...props}
          className={className}
        />
      );
    }
  
    return (
      <input
        {...props}
        className={className}
        ref={ref}
      />
    );
  });

export { Input };
