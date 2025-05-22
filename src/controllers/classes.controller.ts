import { ClassRequest } from '../contracts';
import { ClassesService } from '../services';
import { Request, Response, NextFunction } from 'express';
export class ClassesController {
  private surveyService: ClassesService = new ClassesService();

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ClassRequest = req.body;
      const response = await this.surveyService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
