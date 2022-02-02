import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useExercises() {
  return useQuery("exercises", () =>
    fetch("/api/exercises").then(res => res.json())
  );
}

export function useExerciseByUserId(userId) {
  return useQuery(
    ["exercises", userId],
    () => fetch(`/api/exercises/${userId}`).then(res => res.json()),
    { enabled: !!userId }
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
