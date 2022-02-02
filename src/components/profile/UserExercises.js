import Card from "../card";
import dayjs from "dayjs";
import LoadingIcon from "../loading-icon";
import { Paragraph } from "../typography";
import { useExerciseByUserId } from "../../hooks/use-exercises";

export default function UserExercises() {
  const { data: userExercises, error, isLoading } = useExerciseByUserId();

  return (
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
  )
}
