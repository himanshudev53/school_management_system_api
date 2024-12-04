import { EUserRoles } from "../../enums";
import { AccountInput, AccountUsersInput, UserInput } from "../../models";
import { IAccounts, IRegistration, IUser } from "../../types";

class ToTypeAuthModel {
  public static ToAccountRegistration(request: IRegistration, user_id: number): AccountInput {
    let db_input: AccountInput = {} as AccountInput;
    db_input.email = request.email;
    db_input.name = request.account_name;
    db_input.slug = request.account_slug;
    db_input.logo = request.logo;
    db_input.is_active = true;
    db_input.created_at = new Date();
    db_input.created_by = user_id;
    return db_input;
  }
  public static ToUserRegistration(request: IRegistration): UserInput {
    let db_input: UserInput = {} as UserInput;
    db_input.password = request.password;
    db_input.salt_password = request.password;
    db_input.email = request.email;
    db_input.is_active = true;
    db_input.created_at = new Date();
    return db_input;
  }
  public static ToAccountUserRegistration(user_id: number, account_id: number): AccountUsersInput {
    let db_input: AccountUsersInput = {} as AccountUsersInput;
    db_input.role_id = EUserRoles.ADMIN;
    db_input.account_id = account_id;
    db_input.user_id = user_id;
    db_input.is_current = false;
    db_input.is_default = false;
    db_input.is_active = true;
    db_input.created_at = new Date();
    db_input.created_by = user_id;
    return db_input;
  }
}
export { ToTypeAuthModel };
