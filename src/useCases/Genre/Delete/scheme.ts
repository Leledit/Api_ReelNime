import Joi from "joi";

export const deleteGenreScheme = Joi.object({
    id: Joi.string().required(),
  });