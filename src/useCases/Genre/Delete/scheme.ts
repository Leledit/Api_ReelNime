import Joi from "joi";

export const GenerDeleteScheme = Joi.object({
  id: Joi.string().required(),
});
