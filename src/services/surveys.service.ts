import { SurveyRequest } from '../contracts';
import { DB } from '../core/database/db';
import { NotFoundException, SuccessException } from '../core/exceptions';
import { FromTypeSurveyToModel as T2M } from '../convertors';
import { ClientRepository, ProjectsRepository, SurveysQualificationConditionsRepository, SurveysQualificationsRepository, SurveysRepository } from '../repositories';
import { SurveyModel, SurveyQualificationModel } from '../models';
import { Transaction } from 'sequelize';
import { Qualification } from '../types';

export class SurveyService {
  private surveyRepo: SurveysRepository;
  private clientRepo: ClientRepository;
  private projectRepo: ProjectsRepository;
  private surveyQualificationRepo: SurveysQualificationsRepository;
  private surveyQualificationConditionRepo: SurveysQualificationConditionsRepository;
  constructor() {
    this.surveyRepo = new SurveysRepository();
    this.clientRepo = new ClientRepository();
    this.projectRepo = new ProjectsRepository();
    this.surveyQualificationRepo = new SurveysQualificationsRepository();
    this.surveyQualificationConditionRepo = new SurveysQualificationConditionsRepository();
  }

  public async create(request: SurveyRequest): Promise<SuccessException> {
    const transaction = await DB.sequelize.transaction();
    try {
      const clientId = await this.client(request.ClientId, transaction);
      const projectId = await this.project(clientId, request.ClientId, transaction);
      const mapperOutput = T2M.toSurveys(request.Survey, projectId);
      const surveys: Array<SurveyModel> = await this.surveyRepo.bulkCreate(mapperOutput, transaction);
      const surveyIdMapping = new Map();
      request.Survey.forEach((survey, index) => {
        if (surveys[index]) {
          surveyIdMapping.set(survey.SurveyId, surveys[index].id);
        }
      });
      const qualifications = request.Survey.flatMap((survey) =>
        survey.Qualifications.map((qualification) => ({
          ...qualification,
          SurveyId: surveyIdMapping.get(qualification.SurveyId) || null,
        })),
      );
      await this.createSurveyQualifications(qualifications, transaction);
      await transaction.commit();
      return new SuccessException('');
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async client(clientEmail: string, transaction: Transaction): Promise<number> {
    let clientId: number;
    const checkClient = await this.clientRepo.findByEmail(clientEmail);
    if (!checkClient) {
      const mapperOutput = T2M.toClient(clientEmail);
      const createClient = await this.clientRepo.create(mapperOutput, transaction);
      clientId = createClient.id;
    } else {
      clientId = checkClient.id;
    }
    return clientId;
  }
  private async project(clientId: number, clientEmail: string, transaction: Transaction): Promise<number> {
    const mapperOutput = T2M.toProject(clientId, clientEmail);
    const project = await this.projectRepo.create(mapperOutput, transaction);
    return project.id;
  }

  private async createSurveyQualifications(qualifications: Qualification[], transaction: Transaction): Promise<void> {
    const qualificationModels = qualifications.map((qualification) => T2M.toSurveyQualification(qualification));
    const createdQualifications: Array<SurveyQualificationModel> = await this.surveyQualificationRepo.bulkCreate(qualificationModels, transaction);
    const qualificationConditions = qualifications.flatMap((qualification, index) =>
      qualification.OptionIds.map((condition, optionIndex) => ({
        OptionCodes: qualification.OptionCodes,
        OptionIds: qualification.OptionIds,
        OptionCode: qualification.OptionCodes[optionIndex],
        OptionId: condition,
        LastUpdatedOnUTC: qualification.LastUpdatedOnUTC,
        QualificationId: qualification.QualificationId,
        QualificationTypeId: qualification.QualificationTypeId,
        SurveyId: qualification.SurveyId,
        SurveyQualificationId: createdQualifications[index].id,
      })),
    );
    const qualificationConditionModels = qualificationConditions.map((condition) => T2M.toSurveyQualificationCondition(condition));
    console.log({ qualificationConditionModels });
    await this.surveyQualificationConditionRepo.bulkCreate(qualificationConditionModels, transaction);
  }

  // private async createSurveyQuotas(quotas: any[], transaction: Transaction): Promise<void> {
  //   const quotaModels = quotas.map(quota => T2M.toSurveyQuota(quota));
  //   const createdQuotas: Array<SurveyQuotaModel> = await this.surveyQuotaRepo.bulkCreate(quotaModels, transaction);

  //   const quotaConditions = quotas.flatMap((quota, index) =>
  //     quota.Conditions.map(condition => ({
  //       ...condition,
  //       SurveyQuotaId: createdQuotas[index].id,
  //     })),
  //   );

  //   const quotaConditionModels = quotaConditions.map(condition => T2M.toSurveyQuotaCondition(condition));
  //   await this.surveyQuotaConditionRepo.bulkCreate(quotaConditionModels, transaction);
  // }
}
