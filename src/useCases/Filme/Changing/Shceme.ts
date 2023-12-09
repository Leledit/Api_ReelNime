import Joi from "joi";

export const changingFilmeSchema = Joi.object({
  name: Joi.string().required(),
  visa: Joi.string().required(),
  duration: Joi.string().required(),
  lauch: Joi.string().required(),
  note: Joi.string().required(),
  synopsis: Joi.string().required(),
  releaseYear: Joi.number().required(),
  genres: Joi.array().required(),
});
