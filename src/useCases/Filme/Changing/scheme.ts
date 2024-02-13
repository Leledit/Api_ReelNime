import Joi from "joi";

export const FilmeChangingScheme = Joi.object({
  name: Joi.string().required(),
  visa: Joi.string().required(),
  duration: Joi.string().required(),
  note: Joi.string().required(),
  synopsis: Joi.string().required(),
  releaseYear: Joi.number().required(),
  img: Joi.string().required(),
});
