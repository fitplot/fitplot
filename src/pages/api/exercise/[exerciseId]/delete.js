import { StatusCodes } from 'http-status-codes';

import GetExerciseParam from '../../../../schemas/global/get-param';
import { findExerciseWorkoutSets } from '../../../../services/set';

export default async function handler(req, res) {
  const {
    method,
    query: { exerciseId },
  } = req;

  if (method === 'DELETE') {
    const { error: validationError } = GetExerciseParam.validate(exerciseId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const exerciseWorkoutSets = await findExerciseWorkoutSets(exerciseId);
    return exerciseWorkoutSets.length > 0
      ? res.status(StatusCodes.CONFLICT).send('Workout sets have been detected for this exercise!')
      : res.status(StatusCodes.OK).send(exerciseWorkoutSets);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
