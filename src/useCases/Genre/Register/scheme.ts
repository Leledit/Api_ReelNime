import Joi from "joi";

export const registerGenreScheme = Joi.object({
    name: Joi.string().required(),
});