import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { NODE_ENV, SERVER_PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "./config";
import { errorResponder } from "./middlewares";
import { Logger, stream } from "./utils/logger";
import registerRoutes from "./routes";
import YAML from "yamljs";
import bodyParser from "body-parser";
import { SwaggerThemeNameEnum, SwaggerTheme } from "swagger-themes";
import { DATABASE_INITIALIZATION } from "./database";

const theme = new SwaggerTheme();

const options = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.CLASSIC),
};

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = SERVER_PORT || 3000;
    this.connectToDatabase();
    this.initializeSwagger();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info("===================================================");
      Logger.info(`================== ENV: ${this.env} ==================`);
      Logger.info(`======== 🚀 App Listening On The Port ${this.port} ========`);
      Logger.info("===================================================");
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    try {
      // DATABASE_INITIALIZATION.sequelize.sync({ force: true });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(String(LOG_FORMAT), { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json({ limit: "5mb" }));
  }

  private initializeRoutes() {
    registerRoutes(this.app);
  }

  private initializeSwagger() {
    const swaggerDocument = YAML.load("./swagger.yaml");
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  }

  private initializeErrorHandling() {
    this.app.use(errorResponder);
  }
}

export default App;
