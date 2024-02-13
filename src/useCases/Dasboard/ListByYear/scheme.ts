import Joi from "joi";

export const DasboardListByYearScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
  year: Joi.number().required(),
});
