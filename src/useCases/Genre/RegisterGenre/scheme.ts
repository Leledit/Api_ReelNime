import Joi from "joi";

export const genreScheme = Joi.object({
    name: Joi.string().required(),
});