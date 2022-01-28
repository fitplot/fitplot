import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useWorkouts() {
  return useQuery("workouts", () =>
    fetch("/api/workouts").then(res => res.json())
  );
}

export function useCreateWorkout() {
  return useMutation(
    workout =>
      fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workout)
      }).then(res => res.json()),
    {
      onSuccess: res => {
        queryClient.invalidateQueries("workouts");
        window.location.assign(`/workout/${res.id}`);
      }
    }
  );
}
