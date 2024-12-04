import Joi from "joi";

const RegistrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  logo: Joi.string().uri().optional().allow(null).default(null).messages({
    "string.base": "Logo should be a string",
    "string.uri": "Logo must be a valid URI",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match the password",
    "any.required": "Confirm password is required",
  }),
  account_name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Account name should be a string",
    "string.min": "Account name must be at least 3 characters long",
    "string.max": "Account name cannot exceed 50 characters",
    "any.required": "Account name is required",
  }),
  account_slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      "string.base": "Account slug should be a string",
      "string.pattern.base": "Account slug must be a valid slug (e.g., my-account)",
      "any.required": "Account slug is required",
    }),
});
const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export { RegistrationSchema, LoginSchema };
