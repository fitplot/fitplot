import { StatusCodes } from 'http-status-codes';

import CreateWorkoutRequest from '../../schemas/workout/create-workout-request';
import { createWorkout, getAllWorkouts } from '../../services/workout';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    const workouts = await getAllWorkouts();
    return res.status(StatusCodes.OK).send(workouts);
  }

  if (method === 'POST') {
    const { error: validationError } = CreateWorkoutRequest.validate(body);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const newExercise = await createWorkout(body);
    return res.status(StatusCodes.OK).send(newExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
