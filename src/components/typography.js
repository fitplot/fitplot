import clsx from 'clsx';
import React from 'react';

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
  ...properties
}) {
  const Tag = as ?? size;
  return (
    <Tag
      className={clsx(FONT_SIZES[size], TITLE_COLORS[variant], className)}
      {...properties}
    />
  );
}

function H1(properties) {
  return <Title {...properties} size="h1" />
}

function H2(properties) {
  return <Title {...properties} size="h2" />
}

function H3(properties) {
  return <Title {...properties} size="h3" />
}

function H4(properties) {
  return <Title {...properties} size="h4" />
}

function H5(properties) {
  return <Title {...properties} size="h5" />
}

function H6(properties) {
  return <Title {...properties} size="h6" />
}

function Paragraph({
  className,
  prose = true,
  as = 'p',
  textColorClassName = 'text-secondary',
  ...properties
}) {
  const proseClassName = prose ? 'prose prose-light' : '';
  return React.createElement(as, {
    className: clsx(
      "max-w-full text-lg",
      textColorClassName,
      className,
      proseClassName
    ),
    ...properties
  })
}

export { H1, H2, H3, H4, H5, H6, Paragraph };
