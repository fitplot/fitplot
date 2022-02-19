import Joi from 'joi';

import GetIdParam from '../global/get-param';

export default Joi.object({
  amount: Joi.string().required(),
  exerciseId: GetIdParam,
  unit: Joi.string().required(),
  userId: Joi.string().alphanum().required(),
  volume: Joi.string().required(),
  workoutId: GetIdParam,
});
