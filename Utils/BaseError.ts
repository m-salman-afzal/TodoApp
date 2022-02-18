import { HttpStatusCodes } from './HttpStatusCodes';
class BaseError extends Error {
  public name: string;

  public httpCode: HttpStatusCodes;
  public isOperational: boolean;

  constructor(
    message: string,
    name: string,
    httpCode: HttpStatusCodes,
    isOperational: boolean
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends BaseError {
  constructor(message: string = 'Data Entered is not correct') {
    super(message, 'BAD_REQUEST', HttpStatusCodes.BAD_REQUEST, true);
  }
}

class Unauthorized extends BaseError {
  constructor(message: string = 'You are Unauthenticated (not logged in)') {
    super(message, 'UNAUTHORIZED', HttpStatusCodes.UNAUTHORIZED, true);
  }
}

class Forbidden extends BaseError {
  constructor(
    message: string = 'You are Unauthorized (permission not allowed)'
  ) {
    super(message, 'FORBIDDEN', HttpStatusCodes.FORBIDDEN, true);
  }
}

class NotFound extends BaseError {
  constructor(message: string = "Requested resource can't be found") {
    super(message, 'NOT_FOUND', HttpStatusCodes.NOT_FOUND, true);
  }
}

export { BaseError, BadRequest, Unauthorized, Forbidden, NotFound };
