import Joi from "joi";

export const FilmeListOneScheme = Joi.object({ id: Joi.string().required() });
