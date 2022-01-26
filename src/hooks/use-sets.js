import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useSets(workoutId) {
  return useQuery(
    ["sets", workoutId],
    () => fetch(`/api/workout/${workoutId}/sets`).then((res) => res.json()),
    { enabled: !!workoutId }
  );
}

export function useCreateSet() {
  return useMutation(
    (set) =>
      fetch(`/api/workout/${workoutId}/sets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...set,
          userId: "",
        }),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sets", workoutId]);
      },
    }
  );
}
