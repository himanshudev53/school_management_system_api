import express from 'express';
import bodyParser from 'body-parser';
import { SurveyController } from '../controllers';
const surveyController = new SurveyController();
const route = express.Router();

route.post('', surveyController.create.bind(surveyController));
route.use(bodyParser.json());
export { route as SurveyRouters };
