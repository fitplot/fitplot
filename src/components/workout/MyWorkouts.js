import React from "react";
import dayjs from "dayjs";
import AddWorkout from "./AddWorkout";
import Button from "../button";
import Card from "../card";
import Layout from "../layout";
import LoadingIcon from "../loading-icon";
import { H1, Paragraph } from "../typography";
import { useWorkouts, useDeleteWorkout } from "../../hooks/use-workouts";
import { useRouter } from "next/router";
import { ChevronRightIcon, FireIcon, TrashIcon } from "@heroicons/react/solid";

export default function MyWorkouts() {
  const router = useRouter();
  const { data: workouts, error, isLoading } = useWorkouts();
  const mutation = useDeleteWorkout();

  const [showWorkoutDialog, setShowWorkoutDialog] = React.useState(false);
  const openWorkoutDialog = () => setShowWorkoutDialog(true);
  const closeWorkoutDialog = () => {
    setShowWorkoutDialog(false);
  };

  const deleteWorkout = async (id) => {
    await mutation.mutateAsync({ id });
  };

  return (
    <>
      <Layout>
        <form
          className="flex-1 flex flex-col space-y-4"
          onSubmit={(event) => {
            openWorkoutDialog();
            event.preventDefault();
          }}
        >
          <H1 className="text-small">My Workouts</H1>
          <div className="flex-1 flex flex-col space-y-2">
            {isLoading && <LoadingIcon className="w-12 h-12 self-center" />}
            {!isLoading &&
              !error &&
              (workouts && workouts.length ? (
                workouts.map(({ id, name, createdAt }) => (
                  <Card
                    key={id}
                    className="flex border border-slate-200 space-x-2"
                  >
                    <Button
                      className="bg-none"
                      onClick={() => deleteWorkout(id)}
                    >
                      <TrashIcon className="text-red-800 w-6 h-6" />
                    </Button>
                    <div className="flex-1 p-4">
                      <div className="text-sm font-medium text-slate-900">
                        {name}
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
          <Button type="submit">
            <FireIcon className="w-6 h-6 inline-block" />
            Workout Now
          </Button>
        </form>
        <AddWorkout isOpen={showWorkoutDialog} close={closeWorkoutDialog} />
      </Layout>
    </>
  );
}
