import express from 'express';
import bodyParser from 'body-parser';
import { SectionsController } from '../controllers';
const sectionController = new SectionsController();
const route = express.Router();

route.post('', sectionController.create.bind(sectionController));
route.use(bodyParser.json());
export { route as SectionRouters };
