// import CustomError from '../../../../Error/CustomError';
import Team from '../../../../database/models/Team';
import { ITeam } from '../../../../interfaces/Teams';

export default class GetTeamsUseCase {
  constructor(private teamModel = Team) {}

  async execute(): Promise<ITeam[]> {
    const data = await this.teamModel.findAll();
    return data;
  }

  // async findById(id: number): Promise<ITeam> {
  //   const data = await this.teamModel.findOne({ where: { id } });
  //   return data as ITeam;
  // }
}
