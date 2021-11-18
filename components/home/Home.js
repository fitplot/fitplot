import Head from "next/head";
import Layout from '../layout';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-blue-600 text-2xl">Welcome to NextLevel Fitness</h1>
      <p className="text-gray-500 text-xl">
        Get started in <em>minutes</em>.
      </p>
    </Layout>
  );
}
