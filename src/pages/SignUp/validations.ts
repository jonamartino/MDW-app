import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  lastname: Joi.string().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  birthday: Joi.date().required().messages({
    "date.base": "Birthday must be a valid date",
    "any.required": "Birthday is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // This fixes the TLD list error
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  repeatPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
});
