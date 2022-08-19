import { NextFunction, Request, Response } from 'express';
import { ITeamsUseCase } from '../../../../interfaces/Teams';

export default class GetTeamsController {
  constructor(private teamsUseCase : ITeamsUseCase) {}

  public async getAll(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const teams = await this.teamsUseCase.execute();
    res.status(200).json(teams);
  }

  // public async getById(req: Request, res: Response, _next: NextFunction): Promise<void> {
  //   const team = await this.teamsUseCase.findById();
  // }
}
