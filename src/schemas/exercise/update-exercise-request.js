import Joi from 'joi';

import GetExerciseParam from './get-exercise-param';

export default Joi.object({
  id: GetExerciseParam,
  name: Joi.string().required(),
});
