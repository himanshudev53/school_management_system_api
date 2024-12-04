import { Application } from "express";
import { authenticateMiddleware } from "../middlewares";
import { UsersRouters } from "./auth.routes";

function routes(app: Application) {
  app.use("/api/v1/auth", UsersRouters);
  app.use(authenticateMiddleware);
}

export default routes;
