import { FireIcon } from "@heroicons/react/solid";
import Head from "next/head";

import Layout from "../layout";
import { H1 } from '../typography'; 

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col flex-1 justify-center items-center">
        <FireIcon className="w-36 h-36 text-red-800 animate-pulse" />
        <H1>
          <em>Nexus</em> Fitness
        </H1>
      </div>
    </Layout>
  );
}
