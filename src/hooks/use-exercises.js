import { useQuery, useMutation } from "react-query";
import { useUser } from "../components/auth";
import queryClient from "../lib/query-client";

export function useExercises() {
  return useQuery("exercises", () =>
    fetch("/api/exercises").then(res => res.json())
  );
}

export function useExerciseByUserId() {
  const { user } = useUser();

  return useQuery(
    "exercises", () =>
    fetch(`/api/exercises/${user.id}`).then(res => res.json()),
    { enabled: !!user }
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
