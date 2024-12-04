import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from "sequelize";

class UserModel extends Model<InferAttributes<UserModel>, UserInput> {
  public id!: number;
  public account_id?: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string | null;
  public password!: string | null;
  public salt_password!: string | null;
  public is_active!: boolean;
  public created_at!: Date;
  public created_by!: number | null;
  public updated_at!: Date;
  public updated_by!: number | null;
}

export interface UserInput extends Optional<InferCreationAttributes<UserModel>, "id" | "account_id"> {}
export interface UserOutput extends Optional<Required<InferAttributes<UserModel>>, "account_id"> {}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      last_name: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      salt_password: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_by: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "users",
      sequelize,
    },
  );

  return UserModel;
}

export { UserModel };
