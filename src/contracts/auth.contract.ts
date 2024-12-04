import { ILoginResponse } from "../types";

class CLoginResponse {
  public token!: string;
  public refresh_token!: string;
  public details!: any;
}

export { CLoginResponse };
