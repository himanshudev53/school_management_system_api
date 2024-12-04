import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from "sequelize";

class AccountUsersModel extends Model<InferAttributes<AccountUsersModel>, AccountUsersInput> {
  public id!: number;
  public user_id!: number;
  public account_id!: number;
  public is_default!: boolean;
  public is_current!: boolean;
  public role_id!: number;
  public is_active!: boolean;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date;
  public updated_by!: number;
}

export interface AccountUsersInput extends Optional<InferCreationAttributes<AccountUsersModel>, "id"> {}
export interface AccountUsersOutput extends Required<InferAttributes<AccountUsersModel>> {}

export default function (sequelize: Sequelize): typeof AccountUsersModel {
  AccountUsersModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      account_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      is_default: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      is_current: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "account_users",
      sequelize,
    },
  );

  return AccountUsersModel;
}

export { AccountUsersModel };
