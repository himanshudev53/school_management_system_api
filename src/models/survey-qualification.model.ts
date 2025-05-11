import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class SurveyQualificationModel extends Model<InferAttributes<SurveyQualificationModel>, SurveyQualificationInput> {
  public id!: number;
  public survey_id!: number;
  public qualification_id!: number;
  public is_active!: boolean | null;
  public created_at!: Date | null;
  public updated_at!: Date | null;
  public sort_order!: number | null;
}

export interface SurveyQualificationInput extends Optional<InferCreationAttributes<SurveyQualificationModel>, 'id'> {}
export interface SurveyQualificationOutput extends Required<InferAttributes<SurveyQualificationModel>> {}

export default function (sequelize: Sequelize): typeof SurveyQualificationModel {
  SurveyQualificationModel.init(
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
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sort_order: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      tableName: 'survey_qualifications',
      sequelize,
      timestamps: false,
    },
  );

  return SurveyQualificationModel;
}

export { SurveyQualificationModel };
