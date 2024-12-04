import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";
import { LoginRequest, RegistrationRequest } from "../contracts";

class AuthController {
  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      let _usersService = new AuthService();
      let requestPayload: RegistrationRequest = new RegistrationRequest();
      requestPayload.payload = req.body;
      let response = await _usersService.registration(requestPayload);
      res.json(response);
    } catch (err: any) {
      next(err);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      let _usersService = new AuthService();
      let requestPayload: LoginRequest = new LoginRequest();
      requestPayload.payload = req.body;
      let response = await _usersService.login(requestPayload);
      res.json(response);
    } catch (err: any) {
      next(err);
    }
  }
}

export { AuthController };
