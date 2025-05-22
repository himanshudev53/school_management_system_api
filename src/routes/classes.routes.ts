import express from 'express';
import bodyParser from 'body-parser';
import { ClassesController } from '../controllers';
const classesController = new ClassesController();
const route = express.Router();

route.post('', classesController.create.bind(classesController));
route.use(bodyParser.json());
export { route as ClassRouters };
