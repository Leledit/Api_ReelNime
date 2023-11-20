import Joi from "joi";

export const listOneAnimeSchema = Joi.object({ id: Joi.string().required() });
