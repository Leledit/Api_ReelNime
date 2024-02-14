import Joi from "joi";

export const GenerSearchScheme = Joi.object({
  query: Joi.string().required(),
});
