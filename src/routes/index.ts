import { Application } from 'express';
import { authenticateMiddleware } from '../middlewares';
import { SurveyRouters } from './surveys.routes';

function routes(app: Application) {
  // app.use(authenticateMiddleware);
  app.use('/api/v1/surveys', SurveyRouters);
}

export default routes;
