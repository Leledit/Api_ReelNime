import Joi from "joi";

export const loginUserSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})