import Joi from "joi";

export const UserDeleteScheme = Joi.object({
  id: Joi.string().required(),
});
