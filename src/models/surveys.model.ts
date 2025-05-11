import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class SurveyModel extends Model<InferAttributes<SurveyModel>, SurveyInput> {
  public id!: number;
  public survey_name!: string;
  public project_id!: number;
  public survey_link!: string;
  public ir!: number;
  public sample_type_id!: number;
  public sample_required!: number;
  public sample_calculation_type!: number;
  public live_date!: Date;
  public loi!: string;
  public cpi!: number;
  public language_id!: number;
  public is_mobile_allowed!: boolean;
  public is_desktop_allowed!: boolean;
  public is_tablet_allowed!: boolean;
  public client_id!: number;
  public survey_start_date!: Date;
  public survey_end_date!: Date;
  public survey_type_id!: number;
  public survey_uid!: string;
  public industry_id!: number;
  public survey_status_id!: number;
  public client_last_update_utc!: number;
  public estimated_revenue!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
  public last_qual_updated_at!: Date;
  public last_quota_updated_at!: Date;
  public last_group_updated_at!: Date;
  public last_survey_updated_at!: Date;
  public is_active!: boolean;
  public client_survey_id!: string;
  public min_margin!: number;
  public survey_hash!: string;
  public qual_hash!: string;
  public quota_hash!: string;
  public group_hash!: string;
  public buyer_id!: string;
  public collect_pii!: boolean;
  public allow_routed_traffic!: boolean;
  public survey_test_link!: string;
  public sub_buyer_id!: string;
  public expose_to_suppliers!: boolean;
  public survey_category_id!: number;
  public account_id!: number;
  public panel_id!: number;
}

export interface SurveyInput extends Optional<InferCreationAttributes<SurveyModel>, 'id'> {}

export interface SurveyOutput extends Required<InferAttributes<SurveyModel>> {}

export default function (sequelize: Sequelize): typeof SurveyModel {
  SurveyModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      survey_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      survey_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ir: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sample_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sample_required: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sample_calculation_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      live_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      loi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cpi: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      language_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_mobile_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_desktop_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_tablet_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      survey_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      survey_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      survey_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      survey_uid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      industry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      survey_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      client_last_update_utc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      estimated_revenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_qual_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_quota_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_group_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_survey_updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      client_survey_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      min_margin: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      survey_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      qual_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      quota_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      group_hash: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      buyer_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      collect_pii: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      allow_routed_traffic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      survey_test_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub_buyer_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expose_to_suppliers: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      survey_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      panel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'surveys',
      sequelize,
      timestamps: false,
      paranoid: true,
    },
  );

  return SurveyModel;
}

export { SurveyModel };
