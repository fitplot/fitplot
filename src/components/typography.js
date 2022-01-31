import React from 'react';
import clsx from 'clsx';

const FONT_SIZES = {
  h1: 'leading-tight text-4xl md:text-5xl',
  h2: 'leading-tight text-3xl md:text-4xl',
  h3: 'text-2xl font-medium md:text-3xl',
  h4: 'text-xl font-medium md:text-2xl',
  h5: 'text-lg font-medium md:text-xl',
  h6: 'text-lg font-medium',
};

const TITLE_COLORS = {
  primary: 'text-black',
  secondary: 'text-gray-400',
};

function Title({
  variant = 'primary',
  size,
  as,
  className,
  ...props
}) {
  const Tag = as ?? size;
  return (
    <Tag
      className={clsx(FONT_SIZES[size], TITLE_COLORS[variant], className)}
      {...props}
    />
  );
}

function H1(props) {
  return <Title {...props} size="h1" />
}

function H2(props) {
  return <Title {...props} size="h2" />
}

function H3(props) {
  return <Title {...props} size="h3" />
}

function H4(props) {
  return <Title {...props} size="h4" />
}

function H5(props) {
  return <Title {...props} size="h5" />
}

function H6(props) {
  return <Title {...props} size="h6" />
}

function Paragraph({
  className,
  prose = true,
  as = 'p',
  textColorClassName = 'text-secondary',
  ...props
}) {
  const proseClassName = prose ? 'prose prose-light' : '';
  return React.createElement(as, {
    className: clsx(
      "max-w-full text-lg",
      textColorClassName,
      className,
      proseClassName
    ),
    ...props
  })
}

export { H1, H2, H3, H4, H5, H6, Paragraph };
