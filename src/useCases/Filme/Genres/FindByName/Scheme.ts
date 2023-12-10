import Joi from "joi";

export const findByNameGenreFilmeSchema = Joi.object({ name: Joi.string().required() });
