import Joi from "joi";

export const AddAnimeSchema = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
