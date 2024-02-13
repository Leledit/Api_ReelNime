import Joi from "joi";

export const DashboardItemScheme = Joi.object({
  id: Joi.string().required(),
});
