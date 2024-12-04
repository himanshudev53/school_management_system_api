class HttpRequestContract {}
class HttpResponseContract {
  status!: string;
  message!: string;
  data!: any;

  constructor() {
    this.message = "";
    this.status = "OK";
    this.data = null;
  }
}

class LoggedInUser {
  public id!: number;
}
export { HttpResponseContract, HttpRequestContract, LoggedInUser };
