import Joi from "joi";

export const GenerChangingScheme = Joi.object({
  name: Joi.string().required(),
});
