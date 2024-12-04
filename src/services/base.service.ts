import { LoggedInUser } from "../contracts";

class BaseService {
  public currentUser: LoggedInUser;
  constructor(client: LoggedInUser) {
    this.currentUser = client;
  }
}
export { BaseService };
