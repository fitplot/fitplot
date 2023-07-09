import clsx from 'clsx';
import React from 'react';

const FONT_SIZES = {
  h1: 'text-4xl md:text-5xl',
  h2: 'text-3xl md:text-4xl',
  h3: 'text-2xl font-medium md:text-3xl',
  h4: 'text-xl font-medium md:text-2xl',
  h5: 'text-lg font-medium md:text-xl',
  h6: 'text-lg font-medium',
};

const TITLE_COLORS = {
  primary: 'text-slate-800',
  secondary: 'text-slate-400',
};

function Title({ variant = 'primary', size, as, className, ...props }) {
  const Tag = as ?? size;
  return (
    <Tag
      className={clsx(FONT_SIZES[size], TITLE_COLORS[variant], className)}
      {...props}
    />
  );
}

function H1(props) {
  return <Title {...props} size='h1' />;
}

function H2(props) {
  return <Title {...props} size='h2' />;
}

function H3(props) {
  return <Title {...props} size='h3' />;
}

function H4(props) {
  return <Title {...props} size='h4' />;
}

function H5(props) {
  return <Title {...props} size='h5' />;
}

function H6(props) {
  return <Title {...props} size='h6' />;
}

function Paragraph({ className, as = 'p', variant = 'default', ...props }) {
  const variants = {
    default: '',
    prose: 'text-gray-500',
  };
  return React.createElement(as, {
    className: clsx('max-w-full text-lg', variants[variant], className),
    ...props,
  });
}

export { H1, H2, H3, H4, H5, H6, Paragraph };
