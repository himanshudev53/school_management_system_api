import { Transaction } from "sequelize";

export default interface RepositoryInterface<T> {
  findAll(): Promise<T[]>;
  findOne(id: number | string): Promise<T | null>;
  create(data: object, transaction?: Transaction): Promise<T>;
}
