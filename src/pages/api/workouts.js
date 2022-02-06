import { createWorkout, deleteWorkout, getAllWorkouts } from '../../services/workout';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    return res.status(200).send(await getAllWorkouts());
  }

  if (method === 'POST') {
    return res.status(200).send(await createWorkout(body));
  }

  if (method === 'DELETE') {
    return res.status(200).send(await deleteWorkout(body));
  }

  return res.status(405).send();
}
