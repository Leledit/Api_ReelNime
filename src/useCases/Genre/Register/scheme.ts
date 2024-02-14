import Joi from "joi";

export const GenerRegisterScheme = Joi.object({
  name: Joi.string().required(),
});
