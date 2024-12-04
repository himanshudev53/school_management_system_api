import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, SERVER_PORT, LOG_DIR, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, LOG_FORMAT, ORIGIN, STACK_HANDLER, AUTH_TOKEN, ACCESS_TOKEN_EXPIRES_TIME, ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_EXPIRES_TIME, REFRESH_TOKEN_PRIVATE_KEY } = process.env;
