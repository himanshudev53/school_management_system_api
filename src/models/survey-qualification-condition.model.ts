import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class SurveyQualificationConditionModel extends Model<InferAttributes<SurveyQualificationConditionModel>, SurveyQualificationConditionInput> {
  public id!: number;
  public survey_id!: number;
  public qualification_id!: number;
  public answer_id!: number | null;
  public answer_text!: string | null;
  public is_active!: boolean;
  public created_by!: number | null;
  public updated_by!: number | null;
  public created_at!: Date;
  public updated_at!: Date | null;
  public deleted_at!: Date | null;
  public qualification_type_id!: number | null;
  public answer_code!: string | null;
  public survey_qualification_id!: number | null;
}

export interface SurveyQualificationConditionInput extends Optional<InferCreationAttributes<SurveyQualificationConditionModel>, 'id'> {}
export interface SurveyQualificationConditionOutput extends Required<InferAttributes<SurveyQualificationConditionModel>> {}

export default function (sequelize: Sequelize): typeof SurveyQualificationConditionModel {
  SurveyQualificationConditionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      survey_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qualification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      answer_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      qualification_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      answer_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      survey_qualification_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'survey_qualification_condition',
      sequelize,
      timestamps: false,
    },
  );

  return SurveyQualificationConditionModel;
}

export { SurveyQualificationConditionModel };
