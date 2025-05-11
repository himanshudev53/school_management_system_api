import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, SERVER_PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, STACK_HANDLER } = process.env;
