import { CLoginResponse, HttpResponse, LoginRequest, RegistrationRequest } from "../contracts";
import { AccountsRepository, AccountUsersRepository, UserRepository } from "../repositories";
import httpStatus from "http-status";
import { DATABASE_INITIALIZATION } from "../database";
import { ToTypeAuthModel as T2M } from "../converters";
import { compare, genSalt, hash } from "bcrypt";
import { generateToken } from "../utils";
import { ILoginResponse } from "../types";
class AuthService {
  private _userRepository: UserRepository = new UserRepository();
  private _accountRepository: AccountsRepository = new AccountsRepository();
  private _accountUserRepository: AccountUsersRepository = new AccountUsersRepository();

  public async registration(request: RegistrationRequest): Promise<HttpResponse> {
    const transaction = await DATABASE_INITIALIZATION.sequelize.transaction();
    try {
      const check_user = await this._userRepository.findByEmail(request.payload.email);
      if (check_user) throw new HttpResponse(httpStatus.CONFLICT, `"${request.payload.email}" this email is already registered.`);
      const salt_rounds = 10;
      const salt = await genSalt(salt_rounds);
      const hashed_password = await hash(request.payload.password, salt);
      const mapper_user_input = T2M.ToUserRegistration(request.payload);
      mapper_user_input.password = hashed_password;
      mapper_user_input.salt_password = salt;
      const create_user = await this._userRepository.create(mapper_user_input, transaction);
      const mapper_account_input = T2M.ToAccountRegistration(request.payload, mapper_user_input.id);
      const create_account = await this._accountRepository.create(mapper_account_input, transaction);
      const mapper_account_user_input = T2M.ToAccountUserRegistration(create_user.id, create_account.id);
      const create_account_user = await this._accountUserRepository.create(mapper_account_user_input, transaction);
      await transaction.commit();
      return new HttpResponse(httpStatus.CREATED, "Successfully");
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  public async login(request: LoginRequest): Promise<HttpResponse> {
    try {
      const response: CLoginResponse = new CLoginResponse();
      const check_user = await this._userRepository.findByEmail(request.payload.email);
      if (!check_user) throw new HttpResponse(httpStatus.NOT_FOUND, `Invalid username or password`);
      const is_matched = await compare(request.payload.password, check_user.password);
      if (!is_matched) throw new HttpResponse(httpStatus.NOT_FOUND, "Invalid username or password");
      const user_account = await this._accountUserRepository.findByUserId(check_user.id);
      check_user.account_id = user_account.account_id;
      response.details = await this._accountUserRepository.findUserDetails(check_user.id);
      // const user_details: ILoginResponse = {} as ILoginResponse;
      // user_details.
      // const salt_rounds = 10;
      // const salt = await genSalt(salt_rounds);
      // const hashed_password = await hash(request.payload.password, salt);
      // const mapper_user_input = T2M.ToUserRegistration(request.payload);
      // mapper_user_input.password = hashed_password;
      // mapper_user_input.salt_password = salt;
      // const create_user = await this._userRepository.create(mapper_user_input, transaction);
      // const mapper_account_input = T2M.ToAccountRegistration(request.payload, mapper_user_input.id);
      // const create_account = await this._accountRepository.create(mapper_account_input, transaction);
      // const mapper_account_user_input = T2M.ToAccountUserRegistration(create_user.id, create_account.id);
      // const create_account_user = await this._accountUserRepository.create(mapper_account_user_input, transaction);
      response.refresh_token = generateToken(check_user).refresh_token;
      response.token = generateToken(check_user).auth_token;
      // console.log(response);
      return new HttpResponse(httpStatus.CREATED, "Successfully", response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export { AuthService };
