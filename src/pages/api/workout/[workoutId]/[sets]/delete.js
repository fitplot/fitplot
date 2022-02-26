import { StatusCodes } from 'http-status-codes';

import DeleteSetParam from '../../../../../schemas/set/delete-set-request';
import { findAndRemoveWorkoutSets } from '../../../../../services/set';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'DELETE') {
    const { exerciseId, workoutId } = body;
    const { error: validationError } = DeleteSetParam.validate({ exerciseId, workoutId });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const deletedSets = await findAndRemoveWorkoutSets(exerciseId, workoutId);
    return res.status(StatusCodes.OK).send(deletedSets);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
