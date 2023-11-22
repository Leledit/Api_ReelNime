import Joi from "joi";

export const changingAnimeSchema = Joi.object({
  name: Joi.string().required(),
  watched: Joi.string().required(),
  qtdEpisodes: Joi.string().required(),
  releaseYear: Joi.string().required(),
  note: Joi.string().required(),
  status: Joi.string().required(),
  nextSeason: Joi.string().optional(),
  previousSeason: Joi.string().optional(),
  synopsis: Joi.string().required(),
  genres: Joi.array().required(),
  id: Joi.string().required(),
});
