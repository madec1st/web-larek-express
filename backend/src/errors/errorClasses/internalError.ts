import CustomError from './customError';

class InternalError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}

export default InternalError;
