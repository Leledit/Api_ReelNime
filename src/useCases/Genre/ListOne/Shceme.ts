import Joi from "joi";

export const listOneGenreScheme = Joi.object({
  id: Joi.string().required(),
});
