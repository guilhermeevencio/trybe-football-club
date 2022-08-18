import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { ILoginUserUseCase } from '../../../../interfaces/User';

export default class UserLoginController {
  constructor(private userLoginUseCase : ILoginUserUseCase) {}

  public async loginUser(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userLoginUseCase.execute(req.body);
    res.status(httpStatus.OK).json(user);
  }
}
