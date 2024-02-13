import Joi from "joi";

export const AnimeGenreFindByNameScheme = Joi.object({
  name: Joi.string().required(),
});
