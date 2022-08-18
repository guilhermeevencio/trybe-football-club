import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;
// import CustomError from '../Error/CustomError';

export default class ErrorHandler {
  static error(req: Request, res: Response, _next: NextFunction) {

  }
}
