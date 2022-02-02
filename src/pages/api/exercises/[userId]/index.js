import { getExercisesByUserId } from '../../../../services/exercise';

export default async function handler(req, res) {
  const { method, query: { exerciseId } } = req;

  if (method === 'GET') {
    return res.status(200).send(await getExercisesByUserId(exerciseId));
  }

  return res.status(405).send();
}
