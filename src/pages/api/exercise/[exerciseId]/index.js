import { StatusCodes } from 'http-status-codes';
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
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const exercise = await getExerciseById(exerciseId);
    return res.status(StatusCodes.OK).send(exercise);
  }

  if (method === 'PUT') {
    const { name } = body;

    const { error: validationError } = UpdateExerciseRequest.validate({ id: exerciseId, name });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const updatedExercise = await updateExerciseNameById(exerciseId, { name });
    return res.status(StatusCodes.OK).send(updatedExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
