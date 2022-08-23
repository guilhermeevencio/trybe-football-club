import { NextFunction, Request, Response } from 'express';
import LeaderboarUseCase from './leaderboardUseCase';

export default class LeaderboardController {
  constructor(private leaderBoardUseCase: LeaderboarUseCase) {}

  public async getAllHome(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matches = await this.leaderBoardUseCase.sortedTeamsInfo('homeTeam');
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public async getAllAway(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const matches = await this.leaderBoardUseCase.sortedTeamsInfo('awayTeam');
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
