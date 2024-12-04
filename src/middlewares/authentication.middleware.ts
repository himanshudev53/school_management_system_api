import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AUTH_TOKEN } from "../config";

const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationToken = req.cookies["Authorization"] || req.headers["access-token"] || (req.header("Authorization") ? req.header("Authorization")?.split("Bearer ")[1] : null);
    console.log({ AUTH_TOKEN, authorizationToken });
    if (authorizationToken == null || authorizationToken == "") {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: "ERROR",
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        name: "JwtTokenError",
        data: null,
      });
    }

    const isAuthenticated = AUTH_TOKEN === authorizationToken;
    if (isAuthenticated) {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        status: "ERROR",
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
        name: "JwtTokenError",
        data: null,
      });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({
      status: "ERROR",
      statusCode: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      name: "JwtTokenError",
      data: null,
    });
  }
};
export { authenticateMiddleware };
