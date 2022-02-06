import { getWorkoutById } from '../../../../services/workout';

export default async function handler(request, res) {
  const { method, query: { workoutId } } = request;

  if (method === 'GET') {
    return res.status(200).send(await getWorkoutById(workoutId));
  }

  return res.status(405).send();
}
