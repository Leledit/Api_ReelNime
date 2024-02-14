import Joi from "joi";

export const FilmePaginationControllerScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required(),
});
