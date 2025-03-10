import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().email({ tlds: {allow: false}}).required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid Email"
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must have at least 6 characters"
    }),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
        "string.empty": "Password is required",
    }),
})