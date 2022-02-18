import { StatusCodes } from 'http-status-codes';

import GetSetParam from '../../../../schemas/global/get-param';
import CreateWorkoutSetRequest from '../../../../schemas/set/create-set-request';
import { createSetForWorkout, getSetsByWorkoutId } from '../../../../services/set';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { workoutId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetSetParam.validate(workoutId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const exerciseSets = await getSetsByWorkoutId(workoutId);
    return res.status(StatusCodes.OK).send(exerciseSets);
  }

  if (method === 'POST') {
    const { error: validationError } = CreateWorkoutSetRequest.validate(body);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const newExerciseSet = await createSetForWorkout(body);
    return res.status(StatusCodes.OK).send(newExerciseSet);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
