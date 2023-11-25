import Joi from "joi";

export const listOneFilmeSchema = Joi.object({ id: Joi.string().required() });