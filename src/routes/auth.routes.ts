import bodyParser from "body-parser";
import express from "express";
import { AuthController } from "../controllers";
import { validatorMiddleware } from "../middlewares";
const router = express.Router();
let _authController = new AuthController();

router.post("/registration", validatorMiddleware("RegistrationSchema"), _authController.registration);
router.post("/login", validatorMiddleware("LoginSchema"), _authController.login);

router.use(bodyParser.json());
export { router as UsersRouters };
