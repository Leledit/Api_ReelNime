import Joi from "joi";

export const findByNameGenreAnimeSchema = Joi.object({ name: Joi.string().required() });
