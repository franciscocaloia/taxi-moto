export class NotFoundError {
  constructor(message) {
    this.message = message;
    this.status = 404;
  }
}

export class UnprocessableError {
  constructor(message) {
    this.message = message;
    this.status = 422;
  }
}

export class GoneError {
  constructor(message) {
    this.message = message;
    this.status = 410;
  }
}

export class NotAuthError {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}
