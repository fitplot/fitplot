import {
  getSetByWorkoutId,
  createSetForWorkout
} from "../../../../services/set";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { workoutId }
  } = req;

  if (method === "GET") {
    return res.status(200).send(await getSetByWorkoutId(workoutId));
  }

  if (method === "POST") {
    return res.status(200).send(await createSetForWorkout(body));
  }

  return res.status(405).send();
}
