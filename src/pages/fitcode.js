import { MarketingLayout } from '@/components/layouts';
import { H1, H2, Lead, Paragraph } from '@/components/typography';

export default function FitCode() {
  return (
    <div className='flex flex-col gap-20 md:gap-36 [&>*]:pb-28 [&>*]:pt-16'>
      <header className='container'>
        <H1>FitCode&trade;</H1>
        <Lead>Lorum ipsum dolor sit amet</Lead>
      </header>
      <section className='container'>
        <H2>Give it a try</H2>
        <Paragraph>
          Do your workout and write it down the way you would with pen and
          paper. No table cells. There aren&apos;t a dozen dropdowns.
        </Paragraph>
      </section>
    </div>
  );
}

FitCode.getLayout = () => MarketingLayout;

export const getServerSideProps = withUser({ required: false });
