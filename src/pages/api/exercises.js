import { StatusCodes } from 'http-status-codes';

import CreateExerciseRequest from '../../schemas/exercise/create-exercise-request';
import GetUserIdParam from '../../schemas/global/get-user-id-param';
import { createExercise, getExercisesForUser } from '../../services/exercise';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { userId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetUserIdParam.validate(userId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const userExercises = await getExercisesForUser(userId);
    return res.status(StatusCodes.OK).send(userExercises);
  }

  if (method === 'POST') {
    const { error: validationError } = CreateExerciseRequest.validate(body);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const newExercise = await createExercise(body);
    return res.status(StatusCodes.OK).send(newExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
