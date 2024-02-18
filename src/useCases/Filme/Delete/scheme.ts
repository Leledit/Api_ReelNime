import Joi from "joi";

export const FilmeDeleteScheme = Joi.object({
  id: Joi.string().required(),
});
