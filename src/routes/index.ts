import { Application } from 'express';
import { authenticateMiddleware } from '../middlewares';
import { SurveyRouters } from './surveys.routes';
import { SectionRouters } from './sections.routes';
import { ClassRouters } from './classes.routes';

function routes(app: Application) {
  // app.use(authenticateMiddleware);
  app.use('/api/v1/surveys', SurveyRouters);
  app.use('/api/v1/sections', SectionRouters);
  app.use('/api/v1/classes', ClassRouters);
}

export default routes;
