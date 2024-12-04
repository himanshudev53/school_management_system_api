import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from "sequelize";

class AccountModel extends Model<InferAttributes<AccountModel>, AccountInput> {
  public id!: number;
  public name!: string;
  public slug!: string;
  public logo!: string;
  public email!: string;
  public is_active!: boolean;
  public created_at!: Date;
  public created_by!: number;
  public updated_at!: Date;
  public updated_by!: number;
}

export interface AccountInput extends Optional<InferCreationAttributes<AccountModel>, "id"> {}
export interface AccountOutput extends Required<InferAttributes<AccountModel>> {}

export default function (sequelize: Sequelize): typeof AccountModel {
  AccountModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      slug: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      logo: {
        allowNull: true,
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
      tableName: "accounts",
      sequelize,
    },
  );

  return AccountModel;
}

export { AccountModel };
