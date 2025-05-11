// http.exception.ts

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public data?: any;

  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.name = this.constructor.name;

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// 200 Bad Request
export class SuccessException extends HttpException {
  constructor(message: string, data?: any) {
    super(200, message, data);
    this.name = 'SuccessException'
  }
}

// 400 Bad Request
export class BadRequestException extends HttpException {
  constructor(message: string, data?: any) {
    super(400, message, data);
    this.name ='BadRequestException'
  }
}

// 401 Unauthorized
export class UnauthorizedException extends HttpException {
  constructor(message: string, data?: any) {
    super(401, message, data);
    this.name = 'UnauthorizedException'
  }
}

// 404 Not Found
export class NotFoundException extends HttpException {
  constructor(message: string, data?: any) {
    super(404, message, data);
    this.name = 'NotFoundException'
  }
}

// 409 Conflict
export class ConflictException extends HttpException {
  constructor(message: string, data?: any) {
    super(409, message, data);
    this.name = 'ConflictException'
  }
}

// 500 Internal Server Error
export class InternalServerErrorException extends HttpException {
  constructor(message: string, data?: any) {
    super(500, message, data);
    this.name = 'InternalServerErrorException'
  }
}

// 403 Forbidden
export class ForbiddenException extends HttpException {
  constructor(message: string, data?: any) {
    super(403, message, data);
    this.name = 'ForbiddenException'
  }
}

// 422 Unprocessable Entity
export class UnprocessableEntityException extends HttpException {
  constructor(message: string, data?: any) {
    super(422, message, data);
    this.name = 'UnprocessableEntityException'
  }
}
