import { Model, ModelStatic, Transaction, UpdateOptions } from 'sequelize';
import { IRepository } from './i.repository';

export class BaseRepository<T extends Model> implements IRepository<T> {
  public model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async create(data: Partial<T['_creationAttributes']>, transaction?: Transaction): Promise<T> {
    return await this.model.create(data as T['_creationAttributes'], { transaction });
  }
  public async bulkCreate(data: Array<Partial<T['_creationAttributes']>>, transaction?: Transaction): Promise<Array<T>> {
    return await this.model.bulkCreate(data as T['_creationAttributes'], { transaction });
  }

  public async findById(id: number): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  public async findAll(): Promise<T[]> {
    return await this.model.findAll();
  }

  public async update(id: number, data: Partial<T['_creationAttributes']>, transaction?: Transaction): Promise<any> {
    const updateOptions: UpdateOptions = { where: { id } as any, returning: true, transaction };
    return await this.model.update(data, updateOptions);
  }

  public async delete(id: number): Promise<number> {
    return await this.model.destroy({ where: { id } as any });
  }
  public async isExist(id: number): Promise<boolean> {
    return !!(await this.model.findOne({ attributes: ['id'], where: { id, is_active: true } as any }));
  }
}
