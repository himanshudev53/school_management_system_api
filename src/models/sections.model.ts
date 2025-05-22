import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class SectionModel extends Model<InferAttributes<SectionModel>, SectionInput> {
  public id!: number;
  public account_id!: number;
  public class_id!: number;
  public name!: string;
  public capacity!: number | null;
  public room_number!: string | null;
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public created_by!: number | null;
  public updated_by!: number | null;
}

export interface SectionInput extends Optional<InferCreationAttributes<SectionModel>, 'id' | 'is_active' | 'created_at' | 'updated_at'> {}
export interface SectionOutput extends Required<InferAttributes<SectionModel>> {}

export default function (sequelize: Sequelize): typeof SectionModel {
  SectionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      room_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'section',
      sequelize,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['account_id', 'class_id', 'name'],
        },
      ],
    },
  );

  return SectionModel;
}

export { SectionModel };
