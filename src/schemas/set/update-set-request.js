import Joi from 'joi';

export default Joi.object({
  amount: Joi.string().required(),
  unit: Joi.string().required(),
  volume: Joi.string().required(),
});
