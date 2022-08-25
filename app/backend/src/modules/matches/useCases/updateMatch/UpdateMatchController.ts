import { NextFunction, Request, Response } from 'express';
import { IUpdateMatchUseCase } from '../../interfaces';

export default class UpdateMatchController {
  constructor(private updateMatchUseCase: IUpdateMatchUseCase) {}
  public async updateInProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.updateMatchUseCase.execute(+id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  public async updateScore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.updateMatchUseCase.updateScore(homeTeamGoals, awayTeamGoals, +id);
      res.status(200).json({ message: 'Match score updated!' });
    } catch (error) {
      next(error);
    }
  }
}
