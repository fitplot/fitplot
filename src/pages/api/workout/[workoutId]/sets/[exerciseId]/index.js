import { deleteAllSetsForExercise, finalAllSetsForExercise } from "../../../../../../services/set";

export default async function handler(req, res) {
  const {
    method,
    query: { exerciseId, workoutId }
  } = req;

  if (method === "GET") {
    return res.status(200).send(await finalAllSetsForExercise(exerciseId, workoutId));
  }

  if (method === "DELETE") {
    return res.status(200).send(await deleteAllSetsForExercise(exerciseId, workoutId));
  }

  return res.status(405).send();
}
