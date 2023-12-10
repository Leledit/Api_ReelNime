import Joi from "joi";

export const AddFilmeSchema = Joi.object({
  id: Joi.string().required(),
  nameGenre: Joi.string().required(),
});
