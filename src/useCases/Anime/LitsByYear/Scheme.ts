import Joi from "joi";

export const LitByYearAnimeScheme = Joi.object({
  year: Joi.number().required(),
});
