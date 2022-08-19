import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';

export default class ErrorHandler {
  static error(error: CustomError, req: Request, res: Response, _next: NextFunction) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}
