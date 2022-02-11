import Joi from 'joi';

import GetExerciseParam from './GetExerciseParam';

export default Joi.object({
  id: GetExerciseParam,
  name: Joi.string().required(),
});
