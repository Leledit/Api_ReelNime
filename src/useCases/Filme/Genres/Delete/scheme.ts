import Joi from "joi";

export const FilmeGenresDeleteScheme = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
