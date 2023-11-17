import Joi from "joi";

export const searchGenreScheme= Joi.object({
    query: Joi.string().required(),
  });