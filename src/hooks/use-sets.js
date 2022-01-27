import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useSets(workoutId) {
  return useQuery(
    ["sets", workoutId],
    () => fetch(`/api/workout/${workoutId}/sets`).then(res => res.json()),
    { enabled: !!workoutId }
  );
}

export function useCreateSet() {
  return useMutation(
    (set, workoutId, userId) =>
      fetch(`/api/workout/${workoutId}/sets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...set,
          userId: userId
        })
      }).then(res => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sets", workoutId]);
      }
    }
  );
}
