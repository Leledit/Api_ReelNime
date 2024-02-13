import Joi from "joi";

export const DashboardListByGenreScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
  genre: Joi.string().required(),
});
