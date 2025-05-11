import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class ClientModel extends Model<InferAttributes<ClientModel>, ClientInput> {
  public id!: number;
  public name!: string | null;
  public email!: string | null;
  public phone!: string | null;
  public is_active!: boolean;
  public is_api_client!: boolean;
  public created_by!: number | null;
  public updated_by!: number | null;
  public code!: string | null;
  public status!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
  public deleted_at!: Date | null;
  public building!: string | null;
  public street!: string | null;
  public state!: string | null;
  public country!: string | null;
  public city!: string | null;
  public zip_code!: string | null;
  public allow_routed_traffic!: boolean | null;
  public account_id!: number | null;
}

export interface ClientInput extends Optional<InferCreationAttributes<ClientModel>, 'id'> {}

export interface ClientOutput extends Required<InferAttributes<ClientModel>> {}

export default function (sequelize: Sequelize): typeof ClientModel {
  ClientModel.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_api_client: {
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
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
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
      building: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      allow_routed_traffic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'clients',
      sequelize,
      timestamps: false,
      paranoid: true,
    },
  );

  return ClientModel;
}

export { ClientModel };
