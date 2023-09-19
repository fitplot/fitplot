import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      default: '',
      h1: 'scroll-m-20 text-4xl lg:text-5xl font-heading',
      h2: 'mt-10 scroll-m-20 [article_>_&]:border-b pb-2 text-3xl lg:text-4xl font-heading first:mt-0',
      h3: 'mt-8 scroll-m-20 text-2xl lg:text-3xl font-heading',
      h4: 'scroll-m-20 text-xl lg:text-2xl font-heading',
      p: 'leading-relaxed md:leading-loose [&:not(:first-child)]:mt-6',
      a: 'font-medium text-primary underline underline-offset-4',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Typography = React.forwardRef(
  ({ className, variant, as = 'span', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : as;
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Typography.displayName = 'Typography';

const H1 = React.forwardRef((props, ref) => (
  <Typography variant='h1' as='h1' {...props} ref={ref} />
));
H1.displayName = 'H1';

const H2 = React.forwardRef((props, ref) => (
  <Typography variant='h2' as='h2' {...props} ref={ref} />
));
H2.displayName = 'H2';

const H3 = React.forwardRef((props, ref) => (
  <Typography variant='h3' as='h3' {...props} ref={ref} />
));
H3.displayName = 'H3';

const H4 = React.forwardRef((props, ref) => (
  <Typography variant='h4' as='h4' {...props} ref={ref} />
));
H4.displayName = 'H4';

const Paragraph = React.forwardRef((props, ref) => (
  <Typography variant='p' as='p' {...props} ref={ref} />
));
Paragraph.displayName = 'Paragraph';

const A = React.forwardRef((props, ref) => (
  <Typography variant='a' as='a' {...props} ref={ref} />
));
A.displayName = 'A';

const Blockquote = React.forwardRef((props, ref) => (
  <Typography variant='blockquote' as='blockquote' {...props} ref={ref} />
));
Blockquote.displayName = 'Blockquote';

const Code = React.forwardRef((props, ref) => (
  <Typography variant='code' as='code' {...props} ref={ref} />
));
Code.displayName = 'Code';

const Lead = React.forwardRef((props, ref) => (
  <Typography variant='lead' as='p' {...props} ref={ref} />
));
Lead.displayName = 'Lead';

const UL = React.forwardRef((props, ref) => (
  <Typography variant='ul' as='ul' {...props} ref={ref} />
));
UL.displayName = 'UL';

const Large = React.forwardRef((props, ref) => (
  <Typography variant='large' {...props} ref={ref} />
));
Large.displayName = 'Large';

const Small = React.forwardRef((props, ref) => (
  <Typography variant='small' {...props} ref={ref} />
));
Small.displayName = 'Small';

const Muted = React.forwardRef((props, ref) => (
  <Typography variant='muted' {...props} ref={ref} />
));
Muted.displayName = 'Muted';

export {
  Typography,
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  A,
  Blockquote,
  Code,
  Lead,
  UL,
  Large,
  Small,
  Muted,
};
