import Joi from "joi";

export const FilmeGenresAddScheme = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
