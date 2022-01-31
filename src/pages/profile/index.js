import Layout from "../../components/layout";
import { H1 } from "../../components/typography";
import { useUser } from "../../components/auth";
import Button from "../../components/button";

export default function Profile() {
  const { logout } = useUser();

  return (
    <Layout>
      <H1>Profile</H1>
      <Button onClick={() => logout()}>Logout</Button>
    </Layout>
  );
}
