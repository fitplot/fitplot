import Button from "../button";
import Card from "../card";
import dayjs from "dayjs";
import Layout from "../layout/Layout";
import LoadingIcon from "../loading-icon";
import { H1, Paragraph } from "../typography";
import { useUser } from "../auth";
import { useExerciseByUserId } from "../../hooks/use-exercises";

export default function Profile() {
  const { user, logout } = useUser();
  const { data: userExercises, error, isLoading } = useExerciseByUserId();

  const username = user ? user.username : "";

  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-4">
        <H1>Profile Page - {username}</H1>
        <div className="flex-1 flex flex-col space-y-2">
          {isLoading && <LoadingIcon className="w-12 h-12 self-center" />}
          {!isLoading &&
            !error &&
            (userExercises && userExercises.length ? (
              userExercises.map(({ id, name, createdAt }) => (
                <Card
                  key={id}
                  className="flex border border-slate-200 space-x-2"
                >
                  <div className="flex-1 p-4">
                    <div className="text-sm font-medium text-slate-900">
                      {name}
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                      {dayjs(createdAt).format("MMM DD, YYYY h:mm a")}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Paragraph>No exercise history.</Paragraph>
            ))}
        </div>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </Layout>
  );
}
