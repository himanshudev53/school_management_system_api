import App from "./app";
import { Logger } from "./utils";

const app = new App();
app.listen();

process.on("uncaughtException", function (error) {
  Logger.error(error);
});
