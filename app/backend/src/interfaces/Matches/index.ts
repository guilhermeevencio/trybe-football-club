import Match from '../../database/models/Match';

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

export {
  IMatchesUseCase,
  IMatch,
  ICreatedMatch,
  ICreateMatchRequestBody,
};
