import Joi from "joi";

export const paginationFilmeScheme = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  });