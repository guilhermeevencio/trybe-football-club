import { NextFunction, Request, Response } from 'express';
import { ICreateMatchRequestBody, ICreateMatchUseCase } from '../../../../interfaces/Matches';

export default class CreateMatchController {
  constructor(private createMatchUseCase: ICreateMatchUseCase) {}

  public async createMatch(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const matchInfo: ICreateMatchRequestBody = req.body;
    const createdMatch = await this.createMatchUseCase.execute(matchInfo);

    res.status(201).json(createdMatch);
  }
}
