import Joi from "joi";

export const itemDashboardScheme = Joi.object({
  id: Joi.string().required(),
});
