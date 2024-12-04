import winston, { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { LOG_DIR } from "../config";

const log_dir: string = join(__dirname, String(LOG_DIR));

if (!existsSync(log_dir)) {
  mkdirSync(log_dir);
}

const custom_levels = { fatal: 0, error: 1, warn: 2, info: 3, http: 4, debug: 5 };
const custom_colors = { fatal: "red", error: "red", warn: "yellow", info: "green", http: "magenta", debug: "white" };
winston.addColors(custom_colors);

const console_format = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }),
  format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
);

const file_format = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:SSS" }),
  format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
);

const transport_options = {
  console: new transports.Console({ format: console_format }),
  fileFormat: file_format,
  dailyRotateFileDebug: new transports.DailyRotateFile({
    level: "debug",
    datePattern: "YYYY-MM-DD",
    dirname: join(log_dir, "/debug"),
    filename: `%DATE%.log`,
    maxFiles: 30,
    json: false,
    zippedArchive: true,
  }),
  dailyRotateFileError: new transports.DailyRotateFile({
    level: "error",
    datePattern: "YYYY-MM-DD",
    dirname: join(log_dir, "/error"),
    filename: `%DATE%.log`,
    maxFiles: 30,
    json: false,
    zippedArchive: true,
  }),
};

const Logger = createLogger({
  levels: custom_levels,
  transports: [transport_options.console, transport_options.dailyRotateFileError, transport_options.dailyRotateFileDebug],
  exceptionHandlers: [transport_options.console, transport_options.dailyRotateFileError, transport_options.dailyRotateFileDebug],
});

const stream = {
  write: (message: string) => {
    Logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};

export { Logger, stream };
