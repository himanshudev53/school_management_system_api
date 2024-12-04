import { Transaction } from "sequelize";
import { AccountUsersOutput, AccountUsersInput } from "../models";
import RepositoryInterface from "./repository.interface";
import { DATABASE_INITIALIZATION } from "../database";

class AccountUsersRepository implements RepositoryInterface<AccountUsersOutput> {
  private account_users = DATABASE_INITIALIZATION.AccountUsers;
  findAll(): Promise<AccountUsersOutput[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number | string): Promise<AccountUsersOutput> {
    throw new Error("Method not implemented.");
  }
  public async findByUserId(user_id: number): Promise<AccountUsersOutput> {
    return await this.account_users.findOne({ where: { user_id, is_active: true } });
  }
  public async findUserDetails(user_id: number): Promise<AccountUsersOutput> {
    let [[database_query]] = await DATABASE_INITIALIZATION.sequelize.query({
      query: `select u.id,concat(u.first_name,u.last_name) as name,u.email,
case 
	when au.is_default then lr.name else '' 
end  as role_name
,jsonb_agg(jsonb_build_object(
	'id',a.id,
	'name',a.name,
	'slug',a.slug,
	'logo',a.logo
)) from users u
inner join account_users au on au.user_id = u.id
inner join accounts a on au.account_id = a.id
left join list_role lr on lr.id = au.role_id
where u.id = ?
group by u.id,lr.name,au.is_default`,
      values: [user_id],
    });

    return database_query as AccountUsersOutput;
  }
  public async create(data: AccountUsersInput, transaction: Transaction): Promise<AccountUsersOutput> {
    return await this.account_users.create(data, { transaction });
  }
}

export { AccountUsersRepository };
