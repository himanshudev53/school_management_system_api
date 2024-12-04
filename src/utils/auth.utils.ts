import { sign } from "jsonwebtoken";
// import { DataStoredInToken, SignUpRequest, TokenDataResponse } from "../contracts";
import { ACCESS_TOKEN_EXPIRES_TIME, ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_EXPIRES_TIME, REFRESH_TOKEN_PRIVATE_KEY } from "../config";

import { UserOutput } from "../models";
import { ICurrentUser } from "../types";

function generateToken(user: UserOutput): { auth_token: string; refresh_token: string } {
  const dataStored_in_token: ICurrentUser = { id: user.id, account_id: user.account_id };
  const auth_token = sign(dataStored_in_token, ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: Number(ACCESS_TOKEN_EXPIRES_TIME) });
  const refresh_token = sign(dataStored_in_token, REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: Number(REFRESH_TOKEN_EXPIRES_TIME) });
  return { auth_token, refresh_token };
}

export { generateToken };
