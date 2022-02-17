import GetExerciseParam from '../../../../schemas/exercise/get-exercise-param';
import UpdateExerciseRequest from '../../../../schemas/exercise/update-exercise-request';
import { getExerciseById, updateExerciseNameById } from '../../../../services/exercise';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { exerciseId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetExerciseParam.validate(exerciseId);
    if (validationError) return res.status(400).send(validationError);

    const exercise = await getExerciseById(exerciseId);
    return res.status(200).send(exercise);
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
