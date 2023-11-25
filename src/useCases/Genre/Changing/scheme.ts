import Joi from "joi";

export const changingGenreScheme = Joi.object({
  name: Joi.string().required(),
});
