import Joi from "joi";

export const GenerListOnelScheme = Joi.object({
  id: Joi.string().required(),
});
