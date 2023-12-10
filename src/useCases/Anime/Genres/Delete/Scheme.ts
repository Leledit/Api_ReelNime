import Joi from "joi";

export const DeleteAnimeSchema = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
