import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { SurveyQualificationConditionModel } from '../models';

export class SurveysQualificationConditionsRepository extends BaseRepository<SurveyQualificationConditionModel> {
  constructor() {
    super(DB.SurveyQualificationCondition);
  }
}
