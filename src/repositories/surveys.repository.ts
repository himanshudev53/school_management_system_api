import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { SurveyModel } from '../models';

export class SurveysRepository extends BaseRepository<SurveyModel> {
  constructor() {
    super(DB.Surveys);
  }
}
