import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import CustomError from '../../../../Error/CustomError';
import { ILoginUserUseCase } from '../../../../interfaces/User';

export default class UserLoginController {
  constructor(private userLoginUseCase : ILoginUserUseCase) {}

  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new CustomError('All fields must be filled', 400);

      const token = await this.userLoginUseCase.execute(req.body);

      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
