import Joi from "joi";

export const paginationAnimeScheme = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  });