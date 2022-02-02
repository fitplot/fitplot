import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useExercises() {
  return useQuery("exercises", () =>
    fetch("/api/exercises").then(res => res.json())
  );
}

export function useExerciseByUserId(exerciseId) {
  return useQuery(
    ["exercises", exerciseId],
    () => fetch(`/api/exercises/${exerciseId}`).then(res => res.json()),
    { enabled: !!exerciseId }
  );
}


export function useCreateExercise() {
  return useMutation(
    exercise =>
      fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exercise)
      }).then(res => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("exercises");
      }
    }
  );
}
