import Joi from "joi";

export const DeleteFilmeSchema = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
