import { getWorkoutsByUserId } from '../../../../services/workout';

export default async function handler(req, res) {
  const {
    method,
    query: { userId },
  } = req;

  if (method === 'GET') {
    return res.status(200).send(await getWorkoutsByUserId(userId));
  }

  return res.status(405).send();
}
