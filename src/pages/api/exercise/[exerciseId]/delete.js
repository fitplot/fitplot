import { StatusCodes } from 'http-status-codes';

import DeleteExerciseParam from '../../../../schemas/exercise/delete-exercise-request';
import { deleteExercise } from '../../../../services/exercise';
import { findExerciseSets, replaceExerciseId } from '../../../../services/set';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'DELETE') {
    const { exerciseId, replaceWith } = body;
    const { error: validationError } = DeleteExerciseParam.validate({
      exerciseId,
      replaceWith,
    });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    if (replaceWith !== undefined) {
      const replacedExerciseIds = await replaceExerciseId({ exerciseId, replaceWith });
      const exerciseDeleted = await deleteExercise({ exerciseId });
      return res
        .status(StatusCodes.OK)
        .send({ replaced: replacedExerciseIds, deleted: exerciseDeleted });
    }

    if (replaceWith === undefined) {
      const exerciseWorkoutSets = await findExerciseSets({ exerciseId });
      return exerciseWorkoutSets.length > 0
        ? res
            .status(StatusCodes.CONFLICT)
            .send('Workout sets have been detected for this exercise!')
        : res.status(StatusCodes.OK).send(exerciseWorkoutSets);
    }
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
