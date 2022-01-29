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

  const [showExerciseDialog, setShowExerciseDialog] = React.useState(false);
  const openExerciseDialog = () => setShowExerciseDialog(true);
  const closeExerciseDialog = () => {
    setShowExerciseDialog(false);
  };

  const deleteWorkout = async (id) => {
    await mutation.mutateAsync({ id });
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-4">
        <Button className="inline-flex justify-center items-center" type="submit" onClick={openExerciseDialog}>
          <FireIcon className="w-6 h-6" />
          Workout Now
        </Button>
      </div>
      <AddWorkout isOpen={showExerciseDialog} close={closeExerciseDialog} />
      <H1>My Workouts</H1>
      <div className="flex-1 flex flex-col justify-center">
        {isLoading && <LoadingIcon className="w-12 h-12 self-center" />}
        {!isLoading &&
          !error &&
          (workouts ? (
            workouts.map(({ id, name, createdAt }) => (
              <Card key={id} className="flex mb-4 border border-slate-200">
                <TrashIcon onClick={() => deleteWorkout(id)} className="mt-auto mb-auto pl-2 w-10 h-10" />
                <div className="flex-1 pt-4 pr-4 pb-4 pl-2">
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
    </Layout >
  );
}
