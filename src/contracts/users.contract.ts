import { ILogin, IRegistration } from "../types";

class RegistrationRequest {
  public payload: IRegistration;
}
class LoginRequest {
  public payload: ILogin;
}
export { RegistrationRequest, LoginRequest };
