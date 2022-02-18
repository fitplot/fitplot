import { StatusCodes } from 'http-status-codes';

import GetUserIdParam from '../../../../schemas/global/get-user-id-param';
import { getWorkoutsByUserId } from '../../../../services/workout';

export default async function handler(req, res) {
  const {
    method,
    query: { userId },
  } = req;

  if (method === 'GET') {
    const { error: validationError } = GetUserIdParam.validate(userId);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const userWorkouts = await getWorkoutsByUserId(userId);
    return res.status(StatusCodes.OK).send(userWorkouts);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
