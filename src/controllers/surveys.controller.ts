import { SurveyRequest } from '../contracts';
import { SurveyService } from '../services';
import { Request, Response, NextFunction } from 'express';
export class SurveyController {
  private surveyService: SurveyService = new SurveyService();

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SurveyRequest = req.body;
      const response = await this.surveyService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
