import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

class ClassModel extends Model<InferAttributes<ClassModel>, ClassInput> {
  public id!: number;
  public account_id!: number;
  public name!: string;
  public code!: string | null;
  public description!: string | null;
  public display_order!: number;
  public is_active!: boolean;
  public updated_at!: Date;
  public created_by!: number | null;
  public created_at!: Date;
  public updated_by!: number | null;
}

export interface ClassInput extends Optional<InferCreationAttributes<ClassModel>, 'id' | 'display_order' | 'is_active' | 'created_at' | 'updated_at'> {}
export interface ClassOutput extends Required<InferAttributes<ClassModel>> {}

export default function (sequelize: Sequelize): typeof ClassModel {
  ClassModel.init(
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
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'class',
      sequelize,
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['account_id', 'name'],
        },
      ],
    },
  );

  return ClassModel;
}

export { ClassModel };
