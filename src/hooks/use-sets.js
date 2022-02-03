import { useQuery, useMutation } from "react-query";
import queryClient from "../lib/query-client";

export function useSets(workoutId) {
  return useQuery(
    ["sets", workoutId],
    () => fetch(`/api/workout/${workoutId}/sets`).then(res => res.json()),
    { enabled: !!workoutId }
  );
}

export function useDeleteExercise() {
  return useMutation(
    (obj) =>
      fetch(`/api/workout/${obj.workoutId}/sets/${obj.exerciseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(res => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sets");
      }
    }
  );
}


export function useCreateSet() {
  return useMutation(
    set =>
      fetch(`/api/workout/${set.workoutId}/sets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(set)
      }).then(res => res.json()),
    {
      onSuccess: res => {
        queryClient.invalidateQueries(["sets", res.workoutId]);
      }
    }
  );
}
