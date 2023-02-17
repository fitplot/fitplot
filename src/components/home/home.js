import Head from 'next/head';

import { H1 } from '../typography';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex flex-col flex-1 items-center'>
        <H1>
          <em>Nexus</em> Fitness
        </H1>
      </div>
    </>
  );
}
