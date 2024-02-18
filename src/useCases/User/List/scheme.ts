import Joi from "joi";

export const UserListScheme = Joi.object({
  email: Joi.string().required(),
});
