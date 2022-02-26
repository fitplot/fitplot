import { StatusCodes } from 'http-status-codes';

import GetUserIdParam from '../../schemas/global/get-user-id-param';
import CreateWorkoutRequest from '../../schemas/workout/create-workout-request';
import { createWorkout, getWorkoutsForUser } from '../../services/workout';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { userId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetUserIdParam.validate(userId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const userWorkouts = await getWorkoutsForUser(userId);
    return res.status(StatusCodes.OK).send(userWorkouts);
  }

  if (method === 'POST') {
    const { error: validationError } = CreateWorkoutRequest.validate(body);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const newExercise = await createWorkout(body);
    return res.status(StatusCodes.OK).send(newExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
