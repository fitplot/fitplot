import { getAllExercises, createExercise } from '../../services/exercise';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    return res.status(200).send(await getAllExercises());
  }

  if (method === 'POST') {
    return res.status(200).send(await createExercise(body));
  }

  return res.status(405).send();
}
