import Joi from "joi";

export const FilmeLitByYearScheme = Joi.object({
  year: Joi.number().required(),
});
