// import { IMatch } from '../../../interfaces/Matches/index';
import sortTeamsService from '../../../services/SortTeamsService';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import { IRawLeaderboardData, IGoals, ILeaderboardReturn } from '../interfaces';

export default class LeaderboarUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  private static victoriesNumber(matches: Match[], homeOrAway: string): number {
    let victories = 0;
    if (homeOrAway === 'homeTeam') {
      matches.forEach((match: Match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) { victories += 1; }
      });
      return victories;
    }
    matches.forEach((match: Match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) { victories += 1; }
    });
    return victories;
  }

  private static drawsNumber(matches: Match[]): number {
    // let draws = 0;
    // matches.forEach(({ homeTeamGoals, awayTeamGoals }: Match) => {
    //   if (homeTeamGoals === awayTeamGoals) { draws += 1; }
    // });
    // return draws;
    const draws = matches.reduce((acc: number, match: Match) => {
      // eslint-disable-next-line no-param-reassign
      if (match.homeTeamGoals === match.awayTeamGoals) { acc += 1; }
      return acc;
    }, 0);
    return draws;
  }

  private static lossesNumber(matches: Match[], homeOrAway: string): number {
    let losses = 0;
    if (homeOrAway === 'homeTeam') {
      matches.forEach(({ homeTeamGoals, awayTeamGoals }: Match) => {
        if (homeTeamGoals < awayTeamGoals) { losses += 1; }
      });
      return losses;
    }
    matches.forEach(({ homeTeamGoals, awayTeamGoals }: Match) => {
      if (homeTeamGoals > awayTeamGoals) { losses += 1; }
    });
    return losses;
  }

  private static goalNumbers(matches: Match[], homeOrAway: string): IGoals {
    let goalsFor = 0;
    let goalsAgainst = 0;
    if (homeOrAway === 'homeTeam') {
      matches.forEach(({ homeTeamGoals, awayTeamGoals }: Match) => {
        goalsFor += homeTeamGoals;
        goalsAgainst += awayTeamGoals;
      });
      return { goalsFor, goalsAgainst };
    }
    matches.forEach(({ homeTeamGoals, awayTeamGoals }: Match) => {
      goalsFor += awayTeamGoals;
      goalsAgainst += homeTeamGoals;
    });
    return { goalsFor, goalsAgainst };
  }

  private static convertMatchData(
    team: Team,
    homeTeamMatches: Match[],
    homeOrAway: string,
  ): IRawLeaderboardData {
    const wons = LeaderboarUseCase.victoriesNumber(homeTeamMatches, homeOrAway);
    const draws = LeaderboarUseCase.drawsNumber(homeTeamMatches);
    const losses = LeaderboarUseCase.lossesNumber(homeTeamMatches, homeOrAway);
    const goals = LeaderboarUseCase.goalNumbers(homeTeamMatches, homeOrAway);
    return { team: team.teamName, wons, draws, losses, ...goals };
  }

  private async rawLeaderBoardData(homeOrAway: string): Promise<IRawLeaderboardData[]> {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teams = await this.teamModel.findAll();
    const teamsRefactored: IRawLeaderboardData[] = [];
    let teamMatches: Match[];

    teams.forEach((teamData) => {
      if (homeOrAway === 'homeTeam') {
        teamMatches = matches.filter((match) => match.homeTeam === teamData.id);
      } else {
        teamMatches = matches.filter((match) => match.awayTeam === teamData.id);
      }

      const team = LeaderboarUseCase.convertMatchData(teamData, teamMatches, homeOrAway);

      teamsRefactored.push(team);
    });

    return teamsRefactored;
  }

  private async formatedTeamsData(homeOrAway: string): Promise<ILeaderboardReturn[]> {
    const rawData: IRawLeaderboardData[] = await this.rawLeaderBoardData(homeOrAway);
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
        efficiency: ((((wons * 3) + draws) / ((wons + draws + losses) * 3)) * 100).toFixed(2),
      };
      return data;
    });
    return formatedData;
  }

  async sortedTeamsInfo(homeOrAway: string): Promise<ILeaderboardReturn[]> {
    const teamData = await this.formatedTeamsData(homeOrAway);
    const sortedTeams = sortTeamsService(teamData);
    return sortedTeams;
  }

  private static allStatsSum(homeTeam: ILeaderboardReturn, team: ILeaderboardReturn) {
    const totalVictories = homeTeam.totalVictories + team.totalVictories;
    const totalDraws = homeTeam.totalDraws + team.totalDraws;
    const totalLosses = homeTeam.totalLosses + team.totalLosses;
    const efficiency = ((((totalVictories * 3) + totalDraws)
    / ((totalVictories + totalDraws + totalLosses) * 3)) * 100).toFixed(2);

    const stats: ILeaderboardReturn = {
      name: team.name,
      totalPoints: homeTeam.totalPoints + team.totalPoints,
      totalGames: homeTeam.totalGames + team.totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor: homeTeam.goalsFavor + team.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + team.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + team.goalsBalance,
      efficiency,
    };
    return stats;
  }

  async getAllTeams(): Promise<ILeaderboardReturn[]> {
    const teamData = await this.formatedTeamsData('homeTeam');
    const awayTeamData = await this.formatedTeamsData('awayTeam');
    const teams: ILeaderboardReturn[] = [];
    awayTeamData.forEach((team: ILeaderboardReturn) => {
      teamData.forEach((homeTeam) => {
        if (homeTeam.name === team.name) {
          const allMatchesStatsObj = LeaderboarUseCase.allStatsSum(homeTeam, team);
          teams.push(allMatchesStatsObj);
        }
      });
    });
    const sortedTeams = sortTeamsService(teams);
    return sortedTeams;
  }
}
