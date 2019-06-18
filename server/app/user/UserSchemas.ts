import Joi from 'joi';

export const RegisterSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .trim()
    .required()
  ,
  name: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});