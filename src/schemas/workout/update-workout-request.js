import Joi from 'joi';

import GetWorkoutParam from '../global/get-param';

export default Joi.object({
  id: GetWorkoutParam,
  name: Joi.string().required(),
});
