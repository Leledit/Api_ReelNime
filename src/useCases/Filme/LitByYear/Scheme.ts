import Joi from "joi";

export const LitByYearFilmeScheme = Joi.object({
  year: Joi.number().required(),
});
