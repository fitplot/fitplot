import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { Balancer } from 'react-wrap-balancer';

import {
  AppIcon,
  Lockup,
  Logo,
  VerticalLockup,
  Wordmark,
} from '@/components/brand';
import { MarketingLayout } from '@/components/layouts';
import { H1, H2, Lead, Paragraph } from '@/components/typography';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import withUser from '@/lib/with-user';

const variants = [
  'bg-white',
  'bg-brand-black text-white',
  'bg-primary text-white',
  'bg-secondary',
  'bg-gradient-to-b from-slate-50 to-slate-100',
];

const palette = [
  {
    name: 'Primary',
    hsl: 'hsl(262.1 83.3% 57.8%)',
    hex: '#8B5CF6',
    tailwind: 'violet-500',
    style: 'bg-primary text-white',
  },
  {
    name: 'Secondary',
    hsl: 'hsl(187.9 85.7% 53.3%)',
    hex: '#22D3EE',
    tailwind: 'cyan-400',
    style: 'bg-secondary',
  },
  {
    name: 'Brand Black',
    hsl: 'hsl(240 24% 10%)',
    hex: '#16161D',
    tailwind: '',
    style: 'bg-brand-black text-white',
  },
  {
    name: 'True White',
    hsl: 'hsl(0 0 100%)',
    hex: '#FFFFFF',
    tailwind: 'white',
    style: 'bg-true-white',
  },
];

export default function BrandPage() {
  return (
    <>
      <Head>
        <title>FitPlot | Brand Kit</title>
      </Head>
      <div className='container flex flex-col gap-20 py-28 md:gap-36'>
        <section className='flex py-28 border-b'>
          <div className='flex flex-col w-full'>
            <H1>Brand Kit</H1>
            <Lead>
              <Balancer>
                Brand kit and guidelines for presenting the FitPlot brand
                professionally.
              </Balancer>
            </Lead>
            <Paragraph>
              <Button>Download Brand Assets</Button>
            </Paragraph>
          </div>
        </section>
        <section>
          <H2>Naming</H2>
          <Paragraph>
            &quot;FitPlot&quot; is a single word, spelled with a capital
            &quot;F&quot; and capital &quot;P&quot;.
          </Paragraph>
        </section>
        <section>
          <H2>Usage</H2>
          <Paragraph className='mb-8'>
            Provide plenty of space around FitPlot assets. Make them big or make
            them small, but give them room to breathe. They shouldn&apos;t feel
            cramped or cluttered.
          </Paragraph>
          <Alert>
            <ShieldExclamationIcon className='h-4 w-4' />
            <AlertDescription>
              The provided graphics are proprietary and protected. Do not alter
              these files in any way, display these graphis in a way that
              implies a relationship, affiliation, or endorsement by FitPlot of
              your product, service, or business. Do not use these graphics as
              part of your own product, service, or business&apos;s name, or
              combine these graphis with any other graphics without written
              consent from FitPlot.
            </AlertDescription>
          </Alert>
        </section>
        <section>
          <H2>Lockup</H2>
          <Paragraph className='mb-8'>
            The FitPlot lockup should be used in all references to FitPlot as
            space allows. Full-color usage is preferred where contrast is
            sufficient between the three brand colors present in the logo and
            the background.
          </Paragraph>
          <div className='grid grid-cols-1 gap-4 text-3xl md:grid-cols-3 md:flex-row'>
            {variants.map((variant, index) => (
              <Card
                key={index}
                className={cn(
                  'flex h-[200px] place-content-center border md:h-[300px] md:flex-1',
                  variant,
                )}
              >
                <Lockup className='w-[256px]' />
              </Card>
            ))}
          </div>
          <Paragraph className='mb-8'>
            In cases where greater vertical space allows, the vertical wordmark
            lockup can be used to place more emphasis on the brand graphic over
            the wordmark alone.
          </Paragraph>
          <div className='grid grid-cols-1 gap-4 text-3xl md:grid-cols-3 md:flex-row'>
            {variants.map((variant, index) => (
              <Card
                key={index}
                className={cn(
                  'flex h-[200px] place-content-center border md:h-[300px] md:flex-1',
                  variant,
                )}
              >
                <VerticalLockup className='w-[96px]  smd:w-[128px]' />
              </Card>
            ))}
          </div>
        </section>
        <section>
          <H2>Wordmark</H2>
          <Paragraph className='mb-8'>
            The FitPlot wordmark should be used in all references to FitPlot as
            space allows. Full-color usage is preferred where contrast is
            sufficient between the three brand colors present in the logo and
            the background.
          </Paragraph>
          <div className='grid grid-cols-1 gap-4 text-3xl md:grid-cols-3 md:flex-row'>
            {variants.map((variant, index) => (
              <Card
                key={index}
                className={cn(
                  'flex h-[200px] place-content-center border md:h-[300px] md:flex-1',
                  variant,
                )}
              >
                <Wordmark className='w-[128px] md:w-[256px]' />
              </Card>
            ))}
          </div>
        </section>
        <section>
          <H2>Logo</H2>
          <Paragraph className='mb-8'>
            Some layout and design cases may require a tighter layout. In such
            cases the logo may be used alone without the wordmark. These cases
            are to be limited as the branded wordmark has stronger brand
            recognition.
          </Paragraph>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row'>
            {variants.map((variant, index) => (
              <Card
                key={index}
                className={cn(
                  'flex h-[200px] place-content-center border md:h-[300px] md:flex-1',
                  variant,
                )}
              >
                <Logo className='w-[128px]' />
              </Card>
            ))}
          </div>
        </section>
        <section>
          <H2>Brand Palette</H2>
          <Paragraph className='mb-8'>Lorum ipsum dolor sit amet.</Paragraph>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:flex-row'>
            {palette.map((color) => {
              return (
                <Card
                  key={color.name}
                  className={cn(
                    'flex h-[200px] items-center p-8 border md:h-[300px] md:flex-1',
                    color.style,
                  )}
                >
                  <div className='flex flex-col'>
                    <span className='font-medium'>{color.name}</span>
                    <span>{color.hsl}</span>
                    <span>{color.hex}</span>
                    <span>{color.tailwind}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
        <section>
          <H2>Icon</H2>
          <Paragraph className='mb-8'>
            When referring to FitPlot as a company, such as on social media, or
            otherwise where an &quot;avatar&quot; or &quot;chip&quot; design is
            required, it is acceptable to use this stylized icon with an
            appropriate corner radius.
          </Paragraph>
          <Card className='flex h-[200px] items-center justify-center border text-white md:h-[300px] md:flex-1 bg-gradient-to-b from-slate-50 to-slate-100'>
            <AppIcon className='w-[128px] md:w-[256px]' />
          </Card>
        </section>
      </div>
    </>
  );
}

BrandPage.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
