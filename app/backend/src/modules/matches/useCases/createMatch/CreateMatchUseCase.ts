import {
  ICreatedMatch,
  ICreateMatchRequestBody,
  ICreateMatchUseCase,
} from '../../../../interfaces/Matches';
import Match from '../../../../database/models/Match';

export default class CreateMatchUseCase implements ICreateMatchUseCase {
  constructor(private matchModel = Match) {}

  async execute(reqBody: ICreateMatchRequestBody): Promise<ICreatedMatch> {
    const createdMatch = await this.matchModel.create({ ...reqBody, inProgress: true });

    return createdMatch;
  }
}
