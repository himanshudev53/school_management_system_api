import * as Validators from "../validations";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../contracts";
import httpStatus from "http-status";

const validatorMiddleware = (validator: string) => {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validation = (Validators as Record<string, any>)[
        validator
      ].validate(req.body);
      if (!validation.error) {
        req.body = validation.value;
        next();
      } else {
        return next(
          new HttpResponse(
            httpStatus.UNPROCESSABLE_ENTITY,
            validation.error.message
          )
        );
      }
    } catch (err) {
      next(
        new HttpResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Internal Server Error"
        )
      );
    }
  };
};

export { validatorMiddleware };
