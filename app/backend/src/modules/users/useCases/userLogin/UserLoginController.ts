import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { ILoginUserUseCase } from '../../../../interfaces/User';

export default class UserLoginController {
  constructor(private userLoginUseCase : ILoginUserUseCase) {}

  public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await this.userLoginUseCase.execute(req.body);

      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
