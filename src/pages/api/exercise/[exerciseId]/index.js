import GetExerciseParam from '../../../../schemas/exercise/GetExerciseParam';
import UpdateExerciseRequest from '../../../../schemas/exercise/UpdateExerciseRequest';
import { getExerciseById, updateExerciseNameById } from '../../../../services/exercise';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { exerciseId },
  } = req;

  if (method === 'GET') {
    try {
      await GetExerciseParam.validateAsync(exerciseId);
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send(await getExerciseById(exerciseId));
  }

  if (method === 'PUT') {
    const { id, name } = body;

    try {
      await UpdateExerciseRequest.validateAsync({ id, name });
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send(await updateExerciseNameById(id, { name }));
  }

  return res.status(405).send();
}
