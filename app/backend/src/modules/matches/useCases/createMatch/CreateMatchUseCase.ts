import {
  ICreatedMatch,
  ICreateMatchRequestBody,
  ICreateMatchUseCase,
} from '../../../../interfaces/Matches';
import Match from '../../../../database/models/Match';
import CustomError from '../../../../Error/CustomError';

export default class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(reqBody: ICreateMatchRequestBody): Promise<ICreatedMatch> {
    const { homeTeam, awayTeam } = reqBody;
    if (homeTeam === awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }

    const createdMatch = await this.matchModel.create({ ...reqBody, inProgress: true });

    return createdMatch;
  }
}
