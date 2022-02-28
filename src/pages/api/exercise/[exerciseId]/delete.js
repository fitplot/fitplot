import { StatusCodes } from 'http-status-codes';

import DeleteExerciseParam from '../../../../schemas/exercise/delete-exercise-request';
import { deleteExercise } from '../../../../services/exercise';
import { replaceExerciseId } from '../../../../services/set';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'DELETE') {
    const { exerciseId, replaceWith } = body;
    const { error: validationError } = DeleteExerciseParam.validate({ exerciseId, replaceWith });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    if (replaceWith) {
      const replacedExerciseIds = await replaceExerciseId({ exerciseId, replaceWith });
      const exerciseDeleted = await deleteExercise({ exerciseId });
      return res
        .status(StatusCodes.OK)
        .send({ replaced: replacedExerciseIds, deleted: exerciseDeleted });
    }

    try {
      res.status(StatusCodes.OK).send(await deleteExercise({ exerciseId }));
    } catch (error) {
      res.status(StatusCodes.CONFLICT).send(error);
    }
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
