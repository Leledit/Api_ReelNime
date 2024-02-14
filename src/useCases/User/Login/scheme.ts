import Joi from "joi";

export const UserLoginScheme = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
