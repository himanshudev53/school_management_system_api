import Joi, { ValidationResult } from "joi";
function createValidator<T>(
  schema: Joi.Schema
): (payload: T) => Promise<ValidationResult<T>> {
  return (payload: T) => {
    return schema.validateAsync(payload, { abortEarly: false });
  };
}

export { createValidator };
