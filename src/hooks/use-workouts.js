import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";
import { useRouter } from "next/router";

export function useWorkouts() {
  return useQuery("workouts", () =>
    fetch("/api/workouts").then(res => res.json())
  );
}

export function useCreateWorkout() {
  const router = useRouter();
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
        router.push(`/workout/${res.id}`);
      }
    }
  );
}

export function useDeleteWorkout() {
  return useMutation(
    workout =>
      fetch("/api/workouts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workout)
      }).then(res => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workouts");
      }
    }
  );
}
