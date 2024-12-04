import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../contracts";
import { Logger } from "../utils";
import httpStatus from "http-status";
import { DatabaseError, ValidationError, EmptyResultError } from "sequelize";

const handleErrorResponse = (res: Response, { success, statusCode, message, type, data = null }: { success: boolean; statusCode: number; message: string; type: string; data?: any }) => {
  res.status(statusCode).json({ success, status: "ERROR", statusCode, message, type, data });
};

const errorResponder = (error: HttpResponse, req: Request, res: Response, next: NextFunction) => {
  let type: string = "INTERNAL_SERVER_ERROR";
  let statusCode: number = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message: string = error.message || "An unexpected error occurred";

  if (error instanceof DatabaseError) {
    type = "DATABASE_ERROR";
    statusCode = httpStatus.BAD_REQUEST;
  } else if (error instanceof ValidationError) {
    type = "VALIDATION_ERROR";
    statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  } else if (error instanceof EmptyResultError) {
    type = "NOT_FOUND_ERROR";
    statusCode = httpStatus.NOT_FOUND;
  } else if (error instanceof HttpResponse) {
    type = "HTTP_ERROR";
    statusCode = error.statusCode;
  }

  Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`);
  handleErrorResponse(res, { success: false, statusCode, message, type });
};

const invalidPathHandler = (req: Request, res: Response) => {
  handleErrorResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Invalid path",
    type: "INVALID_PATH_ERROR",
  });
};

const errorLogger = (error: HttpResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message: string = error.message || "An unexpected error occurred";
  Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`);
  next(error);
};

export { errorResponder, invalidPathHandler, errorLogger };
