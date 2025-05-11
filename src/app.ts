import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { errorLogger, errorResponder, invalidPathHandler } from './middlewares';
import { Logger, stream } from './core/utils';
import registerRoutes from './routes';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import { SwaggerThemeNameEnum, SwaggerTheme } from 'swagger-themes';
import path from 'path';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, SERVER_PORT } from './config';

const theme = new SwaggerTheme();
const customThemeCss = theme.getBuffer(SwaggerThemeNameEnum.DRACULA);
const options = {
  explorer: false,
  customCss: `
    ${customThemeCss}
    .swagger-ui .topbar { background-color: #8E27D7; }
    .swagger-ui .topbar { background-color: #8E27D7; } 
    .swagger-ui .topbar .download-url-wrapper { display: none; }
    .swagger-ui .topbar .topbar-wrapper .link svg { display: none; } 
    .swagger-ui .topbar .topbar-wrapper .link::after {
      content: "BioBrain APIs"; 
      font-size: 30px; 
      color: #ffffff; 
      display: inline-block;
      margin-left: 10px;
      width: 100%;
    }
  `,
  customSiteTitle: 'BioBrain API Documentation',
};

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = SERVER_PORT || 3000;
    this.connectToDatabase();
    this.initializeSwagger();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info('===================================================');
      Logger.info(`================== ENV: ${this.env} ==================`);
      Logger.info(`======== 🚀 App Listening On The Port ${this.port} ========`);
      Logger.info('===================================================');
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    try {
      // database.sequelize.sync({ force: true });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(String(LOG_FORMAT), { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json({ limit: '5mb' }));
  }

  private initializeRoutes() {
    registerRoutes(this.app);
  }

  private initializeSwagger() {
    const swaggerDocument = YAML.load('./swagger.yaml');
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  }

  private initializeErrorHandling() {
    this.app.use(errorResponder);
    this.app.use(invalidPathHandler);
    this.app.use(errorLogger);
  }
}

export default App;
