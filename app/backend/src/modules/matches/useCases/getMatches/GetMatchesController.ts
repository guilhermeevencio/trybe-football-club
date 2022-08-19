import { NextFunction, Request, Response } from 'express';
import { IMatchesUseCase } from '../../../../interfaces/Matches';

export default class GetMatchesController {
  constructor(private matchesuseCase : IMatchesUseCase) {}

  public async getAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const matches = await this.matchesuseCase.execute();
    res.status(200).json(matches);
  }
}
