import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Balancer } from 'react-wrap-balancer';

import { MarketingLayout } from '@/components/layouts';
import {
  Lockup,
  Logo,
  MonochromeLogo,
  VerticalLockup,
  Wordmark,
} from '@/components/logo';
import { H1, H2, Paragraph } from '@/components/typography';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import withUser from '@/lib/with-user';

export default function BrandPage() {
  return (
    <div className='container flex flex-col gap-20 py-28 md:gap-36'>
      <header>
        <VerticalLockup className='mx-auto text-6xl' />
      </header>
      <section className='text-center'>
        <H1>Brand</H1>
        <Balancer>
          <Paragraph>
            Brand kit and guidelines for presenting the <Wordmark /> brand
            professionally.
          </Paragraph>
        </Balancer>
      </section>
      <section>
        <H2>Naming</H2>
        <Paragraph>
          &quot;
          <Wordmark />
          &quot; is a single word, spelled with a capital &quot;F&quot; and
          capital &quot;P&quot;.
        </Paragraph>
      </section>
      <section>
        <H2>Usage</H2>
        <Paragraph>
          Provide plenty of space around <Wordmark /> assets. Make them big or
          make them small, but give them room to breathe. They shouldn&apos;t
          feel cramped or cluttered.
        </Paragraph>
        <Alert>
          <ShieldExclamationIcon className='h-4 w-4' />
          <AlertDescription>
            The provided graphics are proprietary and protected. Do not alter
            these files in any way, display these graphis in a way that implies
            a relationship, affiliation, or endorsement by <Wordmark /> of your
            product, service, or business. Do not use these graphics as part of
            your own product, service, or business&apos;s name, or combine these
            graphis with any other graphics without written consent from{' '}
            <Wordmark />.
          </AlertDescription>
        </Alert>
      </section>
      <section>
        <H2>Wordmark</H2>
        <Paragraph>
          The <Wordmark /> wordmark should be used in all references to{' '}
          <Wordmark /> as space allows. Full-color usage is preferred where
          contrast is sufficient between the three brand colors present in the
          logo and the background.
        </Paragraph>
        <div className='grid grid-cols-1 gap-4 text-3xl md:grid-cols-3 md:flex-row'>
          <Card className='flex h-[200px] place-content-center border text-black md:h-[300px] md:flex-1'>
            <Lockup />
          </Card>
          <Card className='flex h-[200px] place-content-center bg-gradient-to-b from-slate-50 to-slate-100 text-black md:h-[300px] md:flex-1'>
            <Lockup />
          </Card>
          <Card className='flex h-[200px] place-content-center bg-slate-800 text-white md:h-[300px] md:flex-1'>
            <Lockup />
          </Card>
        </div>
      </section>
      <section>
        <H2>Logo</H2>
        <Paragraph>
          Some layout and design cases may require a tighter layout. In such
          cases the logo may be used alone without the wordmark. These cases are
          to be limited as the branded wordmark has stronger brand recognition.
        </Paragraph>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row'>
          <Card className='flex h-[200px] items-center justify-center border text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <Logo />
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <Logo />
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-slate-800 text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <Logo />
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-primary-500 text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <MonochromeLogo />
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-secondary-400 text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <MonochromeLogo />
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-black text-white md:h-[300px] md:flex-1'>
            <div className='h-[200px] w-[200px]'>
              <MonochromeLogo />
            </div>
          </Card>
        </div>
      </section>
      <section>
        <H2>Brand Palette</H2>
        <div className='flex flex-col gap-4 md:flex-row'>
          <Card className='flex h-[200px] items-center justify-center bg-primary-500 text-white md:h-[300px] md:flex-1'>
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Violet</span>
              <span>#8b5cf6</span>
              <span>violet-500</span>
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-secondary-400 text-white md:h-[300px] md:flex-1'>
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Cyan</span>
              <span>#22d3ee</span>
              <span>cyan-400</span>
            </div>
          </Card>
          <Card className='flex h-[200px] items-center justify-center bg-black text-white md:h-[300px] md:flex-1'>
            <div className='flex flex-col items-start'>
              <span className='font-medium'>Black</span>
              <span>#000000</span>
              <span>black</span>
            </div>
          </Card>
        </div>
      </section>
      <section>
        <H2>Icon</H2>
        <Paragraph>
          When referring to <Wordmark /> as a company, such as on social media,
          or otherwise where an &quot;avatar&quot; or &quot;chip&quot; design is
          required, it is acceptable to use this stylized icon with an
          appropriate corner radius.
        </Paragraph>
        <Card className='flex h-[200px] items-center justify-center border text-white md:h-[300px] md:flex-1'>
          <div className='flex w-[128px] flex-col items-start bg-gradient-to-b from-slate-50 to-slate-100 md:h-[128px] md:h-[256px] md:w-[256px]'>
            <Logo />
          </div>
        </Card>
      </section>
    </div>
  );
}

BrandPage.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
