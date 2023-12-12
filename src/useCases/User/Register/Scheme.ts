import Joi from "joi";

export const registerUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})