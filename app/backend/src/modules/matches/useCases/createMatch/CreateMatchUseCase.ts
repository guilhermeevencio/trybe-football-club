import {
  ICreatedMatch,
  ICreateMatchRequestBody,
  ICreateMatchUseCase,
} from '../../../../interfaces/Matches';
import Match from '../../../../database/models/Match';
import CustomError from '../../../../Error/CustomError';
import Team from '../../../../database/models/Team';

export default class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  private async checkIfTeamExists(homeTeam: number, awayTeam: number): Promise<void> {
    const homeTeamResponse = await this.teamModel.findOne({ where: { id: homeTeam } });
    const awayTeamResponse = await this.teamModel.findOne({ where: { id: awayTeam } });

    if (!homeTeamResponse || !awayTeamResponse) {
      throw new CustomError('There is no team with such id!', 404);
    }
  }

  async execute(reqBody: ICreateMatchRequestBody): Promise<ICreatedMatch> {
    const { homeTeam, awayTeam } = reqBody;
    await this.checkIfTeamExists(homeTeam, awayTeam);
    if (homeTeam === awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }

    const createdMatch = await this.matchModel.create({ ...reqBody, inProgress: true });

    return createdMatch;
  }
}
