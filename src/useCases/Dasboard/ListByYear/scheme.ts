import Joi from "joi";

export const litsByYearDashboardScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
  year: Joi.number().required(),
});
