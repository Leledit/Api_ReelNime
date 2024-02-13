import Joi from "joi";

export const AnimePaginationScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});
