import Joi from "joi";

export const deleteFilmeScheme = Joi.object({
  id: Joi.string().required(),
});
