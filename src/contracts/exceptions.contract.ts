import { STACK_HANDLER } from '../config';
class BaseHttpResponse extends Error {
  public statusCode: number;
  public message: string;
  public stack: string | undefined;

  constructor(status: number, message: string, error_code?: string) {
    super(message);
    this.statusCode = status;
    this.message = message;
    this.name = '';
    this.stack = undefined;
  }
  withStackTrace(): this {
    this.stack = this.stack || this.stackTrace();
    return this;
  }

  private stackTrace(): string | undefined {
    const old_stack = this.stack;
    this.stack = undefined;
    const stack = new Error(this.message).stack;
    this.stack = STACK_HANDLER && old_stack;
    return stack;
  }
}

class HttpResponse extends BaseHttpResponse {
  name = 'HttpResponse';
}

export { BaseHttpResponse, HttpResponse };
