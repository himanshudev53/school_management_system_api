import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class ProjectModel extends Model<InferAttributes<ProjectModel>, ProjectInput> {
  public id!: number;
  public name!: string | null;
  public client_id!: number;
  public client_name!: string | null;
  public start_date!: Date;
  public end_date!: Date;
  public created_by!: number | null;
  public updated_by!: number | null;
  public deleted_at!: Date | null;
  public project_manager!: string | null;
  public created_at!: Date | null;
  public updated_at!: Date | null;
  public project_type_id!: number | null;
  public status!: number | null;
  public is_active!: boolean | null;
  public project_manager_id!: string | null;
  public account_id!: number | null;
  public panel_id!: number | null;
}

export interface ProjectInput extends Optional<InferCreationAttributes<ProjectModel>, 'id'> {}
export interface ProjectOutput extends Required<InferAttributes<ProjectModel>> {}

export default function (sequelize: Sequelize): typeof ProjectModel {
  ProjectModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      client_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
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
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      project_manager: {
        type: DataTypes.STRING,
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
      project_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      project_manager_id: {
        type: DataTypes.STRING,
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
      tableName: 'projects',
      sequelize,
      timestamps: false,
      paranoid: true,
    },
  );

  return ProjectModel;
}

export { ProjectModel };
