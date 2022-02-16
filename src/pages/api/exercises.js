import CreateExerciseRequest from '../../schemas/exercise/create-exercise-request';
import { createExercise, getAllExercises } from '../../services/exercise';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    try {
      return res.status(200).send(await getAllExercises());
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  if (method === 'POST') {
    try {
      await CreateExerciseRequest.validateAsync(body);
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send(await createExercise(body));
  }

  return res.status(405).send();
}
