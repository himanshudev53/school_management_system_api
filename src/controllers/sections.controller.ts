import { SectionRequest } from '../contracts';
import { SectionsService } from '../services';
import { Request, Response, NextFunction } from 'express';
export class SectionsController {
  private surveyService: SectionsService = new SectionsService();

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SectionRequest = req.body;
      const response = await this.surveyService.create(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
