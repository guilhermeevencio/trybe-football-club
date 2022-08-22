// import { IMatch } from '../../../interfaces/Matches/index';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';

interface IRawLeaderboardData {
  team: string,
  wons: number,
  draws: number,
  losses: number,
  goalsFor: number,
  goalsAgainst: number,
}

interface IGoals {
  goalsFor: number,
  goalsAgainst: number,
}

export default class LeaderboarUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  private static victoriesNumber(team: Team, matches: Match[]): number {
    let victories = 0;
    matches.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }: Match) => {
      if (team.id === homeTeam && homeTeamGoals > awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  private static drawsNumber(team: Team, matches: Match[]): number {
    let draws = 0;
    matches.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }: Match) => {
      if (team.id === homeTeam && homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  private static lossesNumber(team: Team, matches: Match[]): number {
    let losses = 0;
    matches.forEach(({ homeTeam, homeTeamGoals, awayTeamGoals }: Match) => {
      if (team.id === homeTeam && homeTeamGoals < awayTeamGoals) {
        losses += 1;
      }
    });
    return losses;
  }

  private static goalNumbers(team: Team, matches: Match[]): IGoals {
    let goalsFor = 0;
    let goalsAgainst = 0;
    matches.forEach(({ homeTeamGoals, homeTeam, awayTeamGoals }: Match) => {
      if (team.id === homeTeam) {
        goalsFor += homeTeamGoals;
        goalsAgainst += awayTeamGoals;
      }
    });
    return { goalsFor, goalsAgainst };
  }

  private static goalsAgainstNumber(team: Team, matches: Match[]): number {
    let goalsAgainst = 0;
    matches.forEach(({ awayTeamGoals, homeTeam }: Match) => {
      if (team.id === homeTeam) {
        goalsAgainst += awayTeamGoals;
      }
    });
    return goalsAgainst;
  }

  private async rawLeaderBoardData(): Promise<IRawLeaderboardData[]> {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teams = await this.teamModel.findAll();
    const results = teams.map((team) => {
      const wons = LeaderboarUseCase.victoriesNumber(team, matches);
      const draws = LeaderboarUseCase.drawsNumber(team, matches);
      const losses = LeaderboarUseCase.lossesNumber(team, matches);
      const goals = LeaderboarUseCase.goalNumbers(team, matches);
      return { team: team.teamName, wons, draws, losses, ...goals };
    });

    return results;
  }

  async formatedTeamsData() {
    const rawData: IRawLeaderboardData[] = await this.rawLeaderBoardData();
    const formatedData = rawData.map(({ team, wons, draws, losses, goalsAgainst, goalsFor }) => {
      const data = {
        name: team,
        totalPoints: (wons * 3) + draws,
        totalGames: wons + draws + losses,
        totalVictories: wons,
        totalDraws: draws,
        totalLosses: losses,
        goalsFavor: goalsFor,
        goalsOwn: goalsAgainst,
        goalsBalance: goalsFor - goalsAgainst,
        efficiency: Number(((((wons * 3) + draws) / ((wons + draws + losses) * 3)) * 100)
          .toFixed(2)),
      };
      return data;
    });
    return formatedData;
  }
}
