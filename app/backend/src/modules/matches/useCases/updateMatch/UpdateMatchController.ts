import { NextFunction, Request, Response } from 'express';
import { IUpdateMatchUseCase } from '../../../../interfaces/Matches';

export default class UpdateMatchController {
  constructor(private updateMatchUseCase: IUpdateMatchUseCase) {}
  public async updateMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.updateMatchUseCase.execute(+id);
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}
