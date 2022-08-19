import { ErrorRequestHandler } from 'express';
import CustomError from '../Error/CustomError';

// export default class ErrorHandler {
//   // static error(error: CustomError, req: Request, res: Response, _next: NextFunction) {
//   //   if (error instanceof CustomError) {
//   //     return res.status(error.status).json({ message: error.message });
//   //   }
//   //   return res.status(500).json({ message: error.message });
//   // }
// }

const ErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  console.log(error.message);
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default ErrorHandler;
