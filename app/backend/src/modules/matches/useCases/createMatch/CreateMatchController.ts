import { NextFunction, Request, Response } from 'express';
import { ICreateMatchRequestBody, ICreateMatchUseCase } from '../../interfaces';

export default class CreateMatchController {
  constructor(private createMatchUseCase: ICreateMatchUseCase) {}

  public async createMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matchInfo: ICreateMatchRequestBody = req.body;
      const createdMatch = await this.createMatchUseCase.execute(matchInfo);
      res.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  }
}
