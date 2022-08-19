import Match from '../../database/models/Match';

interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

interface IMatchesUseCase {
  execute(): Promise<Match[]>
}

export {
  IMatchesUseCase,
  IMatch,
};
