import Joi from 'joi';

export default Joi.string().alphanum().min(24).max(24).optional();
