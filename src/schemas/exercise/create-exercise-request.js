import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  userId: Joi.string().alphanum().required(),
});
