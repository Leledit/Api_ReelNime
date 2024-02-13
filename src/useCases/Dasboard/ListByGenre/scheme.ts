import Joi from "joi";

export const listByGenreDashboardScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
  genre: Joi.string().required(),
});
