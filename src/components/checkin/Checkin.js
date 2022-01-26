import { CreditCardIcon } from "@heroicons/react/solid";
import Layout from "../layout/Layout";
import { H1 } from "../typography";

export default function Checkin() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-4">
        <H1>Check-In Now</H1>
        <CreditCardIcon className="w-full text-slate-900" />
      </div>
    </Layout>
  );
};
