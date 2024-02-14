import Joi from "joi";

export const FilmeGenreFindByNameScheme = Joi.object({
  name: Joi.string().required(),
});
