import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../contracts';
import { Logger } from '../core/utils';
import httpStatus from 'http-status';
import { HttpException, SuccessException } from '../core/exceptions';

// Unified error handler
const errorResponder = (error: HttpResponse | Error, req: Request, res: Response, next: NextFunction) => {
  try {
    // Log the error
    Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${error instanceof HttpException ? error.statusCode : 500}, Message:: ${error.message}`);
    console.log(error);

    // Handle HttpException errors
    if (error instanceof HttpException) {
      res.status(error.statusCode).json({
        status: error instanceof SuccessException ? 'SUCCESS' : 'ERROR', // SuccessException should not be treated as an error
        message: error.message,
        data: error.data || null,
      });
    } else {
      // If it's not an HttpException, return generic 500 Internal Server Error
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'ERROR',
        message: 'Internal Server Error',
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

// Middleware for logging all errors
const errorLogger = (error: HttpResponse | Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error instanceof HttpException ? error.statusCode : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || 'Something went wrong';
    Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    next(error);
  } catch (err) {
    next(err);
  }
};

// Invalid path handler
const invalidPathHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'ERROR',
    message: 'Invalid path',
    data: null,
  });
};

export { errorResponder, invalidPathHandler, errorLogger };
