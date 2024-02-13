import Joi from "joi";

export const AnimeListOneScheme = Joi.object({ id: Joi.string().required() });
