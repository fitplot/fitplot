import { getExerciseById, updateExerciseName } from "../../../../services/exercise";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { exerciseId },
  } = req;

  if (method === "GET") {
    return res.status(200).send(await getExerciseById(exerciseId));
  }

  if (method === "PUT") {
    const { id, name } = body;
    return res.status(200).send(await updateExerciseName(id, { name }));
  }

  return res.status(405).send();
}
