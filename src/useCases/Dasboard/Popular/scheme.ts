import Joi from "joi";

export const DasboardPopularScheme = Joi.object({
  limit: Joi.number().required(),
});
