import Match from '../../../database/models/Match';

interface ICreatedMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface IMatch extends ICreatedMatch {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

interface ICreateMatchRequestBody {
  homeTeam: number
  awayTeam: number
  homeTeamGoals: number
  awayTeamGoals: number
}

interface IMatchesUseCase {
  execute(): Promise<Match[]>
}

interface ICreateMatchUseCase {
  execute(reqBody: ICreateMatchRequestBody): Promise<ICreatedMatch>
}

interface IUpdateMatchUseCase {
  execute(id: number): Promise<void>
  updateScore(homeTeamGoals: number, awayTeamsGoals: number, id: number): Promise<void>
}

export {
  IMatchesUseCase,
  ICreateMatchUseCase,
  IMatch,
  ICreatedMatch,
  ICreateMatchRequestBody,
  IUpdateMatchUseCase,
};
