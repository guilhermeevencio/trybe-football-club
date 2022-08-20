import Match from '../../../../database/models/Match';

export default class UpdateMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(id: number) {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}
