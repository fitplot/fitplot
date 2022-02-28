import Joi from 'joi';

import GetExerciseParam from '../global/get-param';
import GetOptionalParam from '../global/get-param-optional';

export default Joi.object({
  exerciseId: GetExerciseParam,
  replaceWith: GetOptionalParam,
});
