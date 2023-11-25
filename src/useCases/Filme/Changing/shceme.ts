import Joi from "joi";

export const changingFilmeSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  visa: Joi.string().required(),
  duration: Joi.string().required(),
  lauch: Joi.string().required(),
  note: Joi.string().required(),
  synopsis: Joi.string().required(),
});
