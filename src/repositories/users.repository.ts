import { Transaction } from "sequelize";
import { UserInput, UserOutput } from "../models";
import RepositoryInterface from "./repository.interface";
import { DATABASE_INITIALIZATION } from "../database";

class UserRepository implements RepositoryInterface<UserOutput> {
  private user_model = DATABASE_INITIALIZATION.Users;
  findAll(): Promise<UserOutput[]> {
    throw new Error("Method not implemented.");
  }
  public async findOne(id: number | string): Promise<UserOutput> {
    throw new Error("Method not implemented.");
  }
  public async findByEmail(email: string): Promise<UserOutput> {
    return await this.user_model.findOne({ where: { email: email.toLowerCase() } });
  }
  public async create(data: UserInput, transaction: Transaction): Promise<UserOutput> {
    return await this.user_model.create(data, { transaction });
  }
}

export { UserRepository };
