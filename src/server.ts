import 'module-alias/register';
import App from './app';
import { Logger } from './core/utils';

const app = new App();
app.listen();

process.on('uncaughtException', function (error) {
  Logger.error(error);
});
