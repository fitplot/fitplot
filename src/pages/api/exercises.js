import CreateExerciseRequest from '../../schemas/exercise/create-exercise-request';
import { createExercise, getAllExercises } from '../../services/exercise';
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'GET') {
    const exercises = await getAllExercises();
    return res.status(StatusCodes.OK).send(exercises);
  }

  if (method === 'POST') {
    const { error: validationError } = CreateExerciseRequest.validate(body);
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    const newExercise = await createExercise(body);
    return res.status(StatusCodes.OK).send(newExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
