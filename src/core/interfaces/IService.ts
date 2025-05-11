export interface IService<T> {
  getAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
}
