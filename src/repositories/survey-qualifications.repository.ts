import { DB } from '../core/database/db';
import { BaseRepository } from './base.repository';
import { SurveyQualificationModel } from '../models';

export class SurveysQualificationsRepository extends BaseRepository<SurveyQualificationModel> {
  constructor() {
    super(DB.SurveyQualification);
  }
}
