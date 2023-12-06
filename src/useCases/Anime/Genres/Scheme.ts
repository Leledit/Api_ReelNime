import Joi from "joi";

export const listGenreAnimeSchema = Joi.object({ name: Joi.string().required() });
