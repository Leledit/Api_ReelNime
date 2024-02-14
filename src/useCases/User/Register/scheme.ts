import Joi from "joi";

export const UserRegisterScheme = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});
