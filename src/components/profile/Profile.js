import Button from "../button";
import Layout from "../layout/Layout";
import { H1 } from "../typography";
import { useUser } from "../auth";
import UserExercises from "./UserExercises";

export default function Profile() {
  const { user, logout } = useUser();

  const username = user ? user.username : "";

  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-4">
        <H1>Profile Page - {username}</H1>
        <UserExercises />
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </Layout>
  );
}
