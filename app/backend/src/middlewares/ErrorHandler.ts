import { Request, Response, NextFunction } from 'express';
import CustomError from '../Error/CustomError';

// const ErrorHandler = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
//   if (error instanceof CustomError) {
//     return res.status(error.status || 500).json({
//       message: error.message,
//     });
//   }
//   return res.status(500).json({
//     message: error.message,
//   });
// };

// export default ErrorHandler;

export default class ErrorHandler {
  static error(error: CustomError, req: Request, res: Response, _next: NextFunction) {
    res.status(error.status).json({ message: error.message });
  }
}
