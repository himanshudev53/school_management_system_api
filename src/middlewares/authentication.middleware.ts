import { NextFunction, Request, Response } from "express";
// import { HttpException } from "../types";
// import { ClientService } from "../services";
const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  //   let authTokenValue = (req.headers["client-api-key"] ? req.headers["client-api-key"] : null) as string;
  //   if (authTokenValue == null || authTokenValue == "") {
  //     return res.status(401).send({ message: "Please enter api key carefully." });
  //   }
  //   let _clientService = new ClientService();
  //   if (authTokenValue) {
  //     let splitToken: Array<string> = authTokenValue.split("_");
  //     if (splitToken.length > 0 && splitToken[0] === "bb") {
  //       let finalToken = authTokenValue.replace("bb_", "");
  //       // const verificationResponse = verify(finalToken, SECRET_KEY as string) as ClientApiAuthRequest;
  //       let response = await _clientService.verifyToken(finalToken);
  //       if (response) {
  //         req.user = response;
  //         next();
  //       } else {
  //         next(new HttpException(401, "Unauthorized"));
  //       }
  //     } else {
  //       next(new HttpException(401, "Unauthorized"));
  //     }
  //   } else {
  //     next(new HttpException(401, "Unauthorized"));
  //   }
  // } catch (error) {
  //   next(new HttpException(401, "Unauthorized"));
  // }
};
export { authenticateMiddleware };
