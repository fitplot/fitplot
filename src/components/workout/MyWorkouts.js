import React from "react";
import { H1, Paragraph } from "../typography";
import Button from "../button";
import Card from "../card";
import Layout from "../layout";
import LoadingIcon from "../loading-icon";
import { useWorkouts, useCreateWorkout } from "../../hooks/use-workouts";
import { useRouter } from "next/router";
import { ChevronRightIcon, FireIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import { useUser } from "../auth/UserProvider";

export default function MyWorkouts() {
  const router = useRouter();
  const { data: workouts, error, isLoading } = useWorkouts();
  const { user } = useUser();
  const mutation = useCreateWorkout();

  const newWorkout = async () => {
    await mutation.mutateAsync({ userId: user.id });
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col space-y-4">
        <Button
          className="inline-flex justify-center items-center"
          onClick={newWorkout}
        >
          <FireIcon className="w-6 h-6" />
          Workout Now
        </Button>
        <H1>My Workouts</H1>
        <div className="flex-1 flex flex-col justify-center">
          {isLoading && <LoadingIcon className="w-12 h-12 self-center" />}
          {!isLoading &&
            !error &&
            (workouts ? (
              workouts.map(({ id, createdAt }) => (
                <Card key={id} className="flex mb-4 border border-slate-200">
                  <div className="flex-1 p-4">
                    {/* TODO: slap a name field on these workouts so we dont have to show ID */}
                    <div className="text-sm font-medium text-slate-900">
                      {id}
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                      {dayjs(createdAt).format("MMM DD, YYYY h:mm a")}
                    </div>
                  </div>
                  <Button onClick={() => router.push(`/workout/${id}`)}>
                    <ChevronRightIcon className="w-6 h-6" />
                  </Button>
                </Card>
              ))
            ) : (
              <Paragraph>No workout history.</Paragraph>
            ))}
        </div>
      </div>
    </Layout>
  );
}
