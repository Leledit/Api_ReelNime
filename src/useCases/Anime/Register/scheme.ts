import Joi from "joi";

export const registerAnimeSchema = Joi.object({
  name: Joi.string().required(),
  watched: Joi.string().required(),
  qtdEpisodes: Joi.string().required(),
  releaseYear: Joi.string().required(),
  note: Joi.string().required(),
  status: Joi.string().required(),
  nextSeason: Joi.string().optional(),
  previousSeason: Joi.string().optional(),
  synopsis: Joi.string().required(),
});
