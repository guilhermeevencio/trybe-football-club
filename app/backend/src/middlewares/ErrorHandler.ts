import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';

export default class ErrorHandler {
  static error(error: CustomError, req: Request, res: Response, _next: NextFunction) {
    res.status(error.status).json({ message: error.message });
  }
}
