import Joi from "joi";

export const searchDashboardScheme = Joi.object({
  search: Joi.string().required(),
  page: Joi.number().required(),
  limit: Joi.number().required(),
});
