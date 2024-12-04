import { Transaction } from "sequelize";
import { AccountInput, AccountOutput } from "../models";
import RepositoryInterface from "./repository.interface";
import { DATABASE_INITIALIZATION } from "../database";

class AccountsRepository implements RepositoryInterface<AccountOutput> {
  private account_model = DATABASE_INITIALIZATION.Accounts;
  findAll(): Promise<AccountOutput[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number | string): Promise<AccountOutput> {
    throw new Error("Method not implemented.");
  }
  public async create(data: AccountInput, transaction: Transaction): Promise<AccountOutput> {
    return await this.account_model.create(data, { transaction });
  }
}

export { AccountsRepository };
