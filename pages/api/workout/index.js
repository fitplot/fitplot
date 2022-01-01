import { getAllWorkouts, createWorkout } from '../../../services/workout';

export default async function handler(req, res) {
  const { method, body } = req;

  // get all workouts
  if (method === 'GET') {
    const workouts = await getAllWorkouts();
    workouts ? res.status(200).send(workouts) : res.status(404).send();
  }

  // create workout
  if (method === 'POST') {
    const response = await createWorkout(body);
    response ? res.status(200).send(response) : res.status(400).send();
  }
}
