import Joi from "joi";

export const registerFilmeSchema = Joi.object({
    name: Joi.string().required(),
    visa: Joi.string().required(),
    duration: Joi.string().required(),
    lauch: Joi.string().required(),
    note: Joi.string().required(),
    synopsis: Joi.string().required(),
  });