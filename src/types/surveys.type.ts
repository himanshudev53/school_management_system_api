export interface ISurveys {
  SurveyId: string;
  Name: string;
  Cpi: number;
  Ir: number;
  Loi: number;
  Completes: number;
  LanguageId: string;
  SurveyUrl: string;
  DesktopAllowed: boolean;
  MobileAllowed: boolean;
  TabletAllowed: boolean;
  LastUpdatedOnUTC: string;
  HasQualifications: boolean;
  HasQuotas: boolean;
  HasSurveyGroups: boolean;
  StartDate: string;
  EndDate: string;
  QualLastUpdatedOnUTC: string;
  QuotaLastUpdatedOnUTC: string;
  Qualifications: Qualification[];
}

export interface Qualification {
  OptionCodes: string[];
  OptionIds: number[];
  OptionCode: string;
  OptionId: number;
  LastUpdatedOnUTC: string;
  QualificationId: number;
  QualificationTypeId: number;
  SurveyId: number;
  SurveyQualificationId: number;
}
