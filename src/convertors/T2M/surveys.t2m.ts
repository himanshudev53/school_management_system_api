import { ClientInput, ProjectInput, SurveyInput, SurveyQualificationConditionInput, SurveyQualificationInput } from '../../models';
import { ISurveys, Qualification } from '../../types';
import { randomUUID } from 'crypto';
export class FromTypeSurveyToModel {
  public static toSurveys(payload: Array<ISurveys>, projectId: number): Array<SurveyInput> {
    return payload.map((survey) => ({
      survey_name: survey.Name,
      project_id: projectId,
      survey_link: '',
      ir: survey.Ir,
      sample_type_id: 1,
      sample_required: 1,
      sample_calculation_type: 0, // number placeholder
      live_date: new Date(),
      loi: '',
      cpi: 0,
      language_id: 0,
      is_mobile_allowed: false,
      is_desktop_allowed: false,
      is_tablet_allowed: false,
      client_id: 0,
      survey_start_date: new Date(),
      survey_end_date: new Date(),
      survey_type_id: 0,
      survey_uid: randomUUID(),
      industry_id: 0,
      survey_status_id: 0,
      client_last_update_utc: 0,
      estimated_revenue: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      last_qual_updated_at: new Date(),
      last_quota_updated_at: new Date(),
      last_group_updated_at: new Date(),
      last_survey_updated_at: new Date(),
      is_active: true,
      client_survey_id: '',
      min_margin: 0,
      survey_hash: '',
      qual_hash: '',
      quota_hash: '',
      group_hash: '',
      buyer_id: '',
      collect_pii: false,
      allow_routed_traffic: false,
      survey_test_link: '',
      sub_buyer_id: '',
      expose_to_suppliers: false,
      survey_category_id: 0,
      account_id: 1,
      panel_id: 1,
    }));
  }
  public static toClient(email: string): ClientInput {
    return {
      name: `CLIENT_${email}`,
      email: email,
      phone: '',
      is_active: true,
      is_api_client: false,
      created_by: null,
      updated_by: null,
      code: email.substring(0, 2).toLocaleUpperCase(),
      status: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      building: null,
      street: null,
      state: null,
      country: null,
      city: null,
      zip_code: null,
      allow_routed_traffic: null,
      account_id: null,
    };
  }
  public static toProject(clientId: number, email: string): ProjectInput {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return {
      name: `PROJECT_${email.split('@')[0].replace('.', '_').toLocaleUpperCase()}`,
      client_id: clientId,
      client_name: null,
      start_date: new Date(),
      end_date: nextMonth,
      created_by: null,
      updated_by: null,
      deleted_at: null,
      project_manager: 'project.manager@example.com', //TODO:: Not Getting
      created_at: new Date(),
      updated_at: new Date(),
      project_type_id: 1,
      status: 1,
      is_active: true,
      project_manager_id: '1', //TODO:: Not Getting
      account_id: null,
      panel_id: null,
    };
  }

  public static toSurveyQualification(survey_qualification: Qualification): SurveyQualificationInput {
    console.log(survey_qualification);
    return {
      survey_id: survey_qualification.SurveyId,
      qualification_id: survey_qualification.QualificationId,
      is_active: true,
      created_at: new Date(),
      updated_at: null,
      sort_order: 1,
    };
  }

  public static toSurveyQualificationCondition(q: Qualification): SurveyQualificationConditionInput {
    console.log(q);

    return {
      survey_id: q.SurveyId,
      qualification_id: q.QualificationId,
      answer_id: q.OptionId,
      answer_text: q.OptionCode,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      qualification_type_id: q.QualificationTypeId,
      answer_code: q.OptionCode,
      survey_qualification_id: q.SurveyQualificationId,
      created_by: null,
      updated_by: null,
      deleted_at: null,
    };
  }
}
