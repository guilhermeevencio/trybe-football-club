import Team from '../../../../database/models/Team';
import Match from '../../../../database/models/Match';

export default class GetMatchesUseCase {
  constructor(private matchModel = Match) {}

  async execute(): Promise<Match[]> {
    const data = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return data;
  }
}
