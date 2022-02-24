import Joi from 'joi';

import GetExerciseParam from '../global/get-param';

export default Joi.object({
  exerciseId: GetExerciseParam,
  workoutId: GetExerciseParam,
});
