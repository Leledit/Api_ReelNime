import Joi from "joi";

export const registerAnimeSchema = Joi.object({
  name: Joi.string().required(),
  watched: Joi.string().required(),
  qtdEpisodes: Joi.number().required(),
  releaseYear: Joi.number().required(),
  note: Joi.number().required(),
  status: Joi.string().required(),
  nextSeason: Joi.string().optional(),
  previousSeason: Joi.string().optional(),
  synopsis: Joi.string().required(),
  img: Joi.string().required(),
});
