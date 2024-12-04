interface IRegistration {
  email: string;
  logo: string;
  password: string;
  confirm_password: string;
  account_name: string;
  account_slug: string;
}
interface ILogin {
  email: string;
  password: string;
}
interface ILoginResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  accounts: Array<IAccountDetails>;
}

interface IAccountDetails {
  id: number;
  name: string;
  slug: string;
}

interface ICurrentUser {
  id: number;
  account_id: number;
}
export { IRegistration, ILogin, ILoginResponse, IAccountDetails, ICurrentUser };
