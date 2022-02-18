import { StatusCodes } from 'http-status-codes';

import GetWorkoutParam from '../../../../schemas/global/get-param';
import UpdateWorkoutParam from '../../../../schemas/workout/update-workout-request';
import { deleteWorkout, getWorkoutById, updateWorkout } from '../../../../services/workout';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { workoutId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetWorkoutParam.validate(workoutId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const workout = await getWorkoutById(workoutId);
    return res.status(StatusCodes.OK).send(workout);
  }

  if (method === 'PUT') {
    const { name } = body;

    const { error: validationError } = UpdateWorkoutParam.validate({ id: workoutId, name });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const updatedWorkout = await updateWorkout(workoutId, { name });
    return res.status(StatusCodes.OK).send(updatedWorkout);
  }

  if (method === 'DELETE') {
    const { error: validationError } = GetWorkoutParam.validate(workoutId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const deletedWorkout = await deleteWorkout(workoutId);
    return res.status(StatusCodes.OK).send(deletedWorkout);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
