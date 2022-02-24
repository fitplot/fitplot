import { StatusCodes } from 'http-status-codes';

import GetSetParam from '../../../../../../schemas/global/get-param';
import UpdateWorkoutSetRequest from '../../../../../../schemas/set/update-set-request';
import { getWorkoutSet, updateWorkoutSet } from '../../../../../../services/set';

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { setId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetSetParam.validate(setId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const workoutSet = await getWorkoutSet(setId);
    return res.status(StatusCodes.OK).send(workoutSet);
  }

  if (method === 'PUT') {
    const { amount, unit, volume } = body;

    const { error: validationError } = UpdateWorkoutSetRequest.validate({ amount, unit, volume });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const updatedExercise = await updateWorkoutSet(setId, { amount, unit, volume });
    return res.status(StatusCodes.OK).send(updatedExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
