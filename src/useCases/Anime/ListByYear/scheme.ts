import Joi from "joi";

export const AnimeListByYearScheme = Joi.object({
  year: Joi.number().required(),
});
