import {
  createSetForWorkout,
  getSetByWorkoutId} from "../../../../services/set";

export default async function handler(request, res) {
  const {
    method,
    body,
    query: { workoutId }
  } = request;

  if (method === "GET") {
    return res.status(200).send(await getSetByWorkoutId(workoutId));
  }

  if (method === "POST") {
    return res.status(200).send(await createSetForWorkout(body));
  }

  return res.status(405).send();
}
