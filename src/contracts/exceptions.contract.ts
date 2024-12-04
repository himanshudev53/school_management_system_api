import { STACK_HANDLER } from "../config";

class HttpResponse extends Error {
  public statusCode: number;
  public message: string;
  public success: boolean = true;
  public status: string = "SUCCESS";
  public stack: string | undefined;
  public data: any = null;

  constructor(statusCode: number, message: string, data: any = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    if (STACK_HANDLER) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.data = data;
  }

  withStackTrace(): this {
    if (STACK_HANDLER) {
      this.stack = this.stackTrace();
    }
    return this;
  }

  private stackTrace(): string | undefined {
    if (STACK_HANDLER) {
      return new Error(this.message).stack;
    }
  }

  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
      // stack: this.stack,
      success: true,
      name: this.name,
      data: this.data,
    };
  }
}

export { HttpResponse };
