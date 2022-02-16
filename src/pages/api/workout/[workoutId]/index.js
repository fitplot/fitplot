import { getWorkoutById, updateWorkout } from '../../../../services/workout';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { workoutId },
  } = req;

  if (method === 'GET') {
    return res.status(200).send(await getWorkoutById(workoutId));
  }

  if (method === 'PUT') {
    const { id, name } = body;
    return res.status(200).send(await updateWorkout(id, { name }));
  }

  return res.status(405).send();
}
