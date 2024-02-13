import Joi from "joi";

export const AnimeGenresDeleteSchema = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
