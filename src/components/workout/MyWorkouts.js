import React from "react";
import dayjs from "dayjs";
import AddWorkout from "./AddWorkout";
import Button from "../button";
import Card from "../card";
import Layout from "../layout";
import LoadingIcon from "../loading-icon";
import { H1, Paragraph } from "../typography";
import { useWorkouts } from "../../hooks/use-workouts";
import { useRouter } from "next/router";
import { ChevronRightIcon, FireIcon, TrashIcon } from "@heroicons/react/solid";

export default function MyWorkouts() {
  const router = useRouter();
  const { data: workouts, error, isLoading } = useWorkouts();

  const [showWorkoutDialog, setShowWorkoutDialog] = React.useState(false);
  const openWorkoutDialog = () => setShowWorkoutDialog(true);
  const closeWorkoutDialog = () => {
    setShowWorkoutDialog(false);
  };

  return (
    <>
      <Layout>
        <div className="flex-1 flex flex-col space-y-4">
          <H1 className="text-small">My Workouts</H1>
          <div className="flex-1 flex flex-col space-y-2">
            {isLoading && <LoadingIcon className="w-12 h-12 self-center" />}
            {!isLoading &&
              !error &&
              (workouts && workouts.length ? (
                workouts.map(({ id, name, createdAt }) => (
                  <Card
                    key={id}
                    className="flex border border-slate-200"
                  >
                    <div className="flex-1 p-2">
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
          <Button onClick={() => openWorkoutDialog()}>
            <FireIcon className="w-6 h-6 inline-block" />
            Workout Now
          </Button>
        </div>
        <AddWorkout isOpen={showWorkoutDialog} close={closeWorkoutDialog} />
      </Layout>
    </>
  );
}
