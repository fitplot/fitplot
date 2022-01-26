import { FireIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Layout from "../layout";
import { H1 } from '../typography'; 

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Nexus Fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1 flex flex-col items-center justify-center">
        <FireIcon className="text-red-800 w-36 h-36 animate-pulse" />
        <H1>
          <em>Nexus</em> Fitness
        </H1>
      </div>
    </Layout>
  );
}
