import Joi from "joi";

export const AnimeGenresAddScheme = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
