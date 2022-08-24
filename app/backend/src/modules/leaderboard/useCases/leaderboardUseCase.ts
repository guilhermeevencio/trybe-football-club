import sortTeamsService from '../../../services/SortTeamsService';
import Match from '../../../database/models/Match';
import Team from '../../../database/models/Team';
import { ILeaderboardReturn, ITeamInfoResults } from '../interfaces';

export default class LeaderboarUseCase {
  constructor(private matchModel = Match, private teamModel = Team) {}

  private static resultsHomeNumbers(name: string, matches: Match[]): ITeamInfoResults {
    const resultsHome = matches.reduce((acc, match: Match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) { acc.wons += 1; }
      if (match.homeTeamGoals === match.awayTeamGoals) { acc.draws += 1; }
      if (match.homeTeamGoals < match.awayTeamGoals) { acc.losses += 1; }
      acc.goalsFavor += match.homeTeamGoals;
      acc.goalsOwn += match.awayTeamGoals;
      return acc;
    }, {
      wons: 0, draws: 0, losses: 0, goalsFavor: 0, goalsOwn: 0, name });
    return resultsHome;
  }

  private static resultsAwayNumbers(name: string, matches: Match[]) {
    const resultsAway = matches.reduce((acc, match: Match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) { acc.wons += 1; }
      if (match.homeTeamGoals === match.awayTeamGoals) { acc.draws += 1; }
      if (match.homeTeamGoals > match.awayTeamGoals) { acc.losses += 1; }
      acc.goalsFavor += match.awayTeamGoals;
      acc.goalsOwn += match.homeTeamGoals;
      return acc;
    }, {
      wons: 0, draws: 0, losses: 0, goalsFavor: 0, goalsOwn: 0, name });
    return resultsAway;
  }

  private static refactorTeamObj(team: ITeamInfoResults): ILeaderboardReturn {
    const points = (team.wons * 3) + team.draws;
    const totalMatches = team.wons + team.draws + team.losses;
    const efficiency = (((points) / ((totalMatches) * 3)) * 100).toFixed(2);
    const formatedData = {
      name: team.name,
      totalPoints: (team.wons * 3) + team.draws,
      totalGames: team.wons + team.draws + team.losses,
      totalVictories: team.wons,
      totalDraws: team.draws,
      totalLosses: team.losses,
      goalsFavor: team.goalsFavor,
      goalsOwn: team.goalsOwn,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency,
    };
    return formatedData;
  }

  async getLeaderBoard(homeOrAway: string) {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teams = await this.teamModel.findAll();
    const teamsRefactored: ILeaderboardReturn[] = [];
    let teamRefactored:ILeaderboardReturn;
    teams.forEach((teamData) => {
      if (homeOrAway === 'homeTeam') {
        const teamMatches = matches.filter((match) => match.homeTeam === teamData.id);
        const rawTeamData = LeaderboarUseCase.resultsHomeNumbers(teamData.teamName, teamMatches);
        teamRefactored = LeaderboarUseCase.refactorTeamObj(rawTeamData);
      } else {
        const teamMatches = matches.filter((match) => match.awayTeam === teamData.id);
        const rawTeamData = LeaderboarUseCase.resultsAwayNumbers(teamData.teamName, teamMatches);
        teamRefactored = LeaderboarUseCase.refactorTeamObj(rawTeamData);
      }
      teamsRefactored.push(teamRefactored);
    });
    return sortTeamsService(teamsRefactored);
  }

  private static allStatsSum(homeTeam: ILeaderboardReturn, awayTeam: ILeaderboardReturn) {
    const totalVictories = homeTeam.totalVictories + awayTeam.totalVictories;
    const totalDraws = homeTeam.totalDraws + awayTeam.totalDraws;
    const totalLosses = homeTeam.totalLosses + awayTeam.totalLosses;
    const efficiency = ((((totalVictories * 3) + totalDraws)
    / ((totalVictories + totalDraws + totalLosses) * 3)) * 100).toFixed(2);

    const stats: ILeaderboardReturn = {
      name: awayTeam.name,
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
      efficiency,
    };
    return stats;
  }

  async getAllTeams(): Promise<ILeaderboardReturn[]> {
    const teamData = await this.getLeaderBoard('homeTeam');
    const awayTeamData = await this.getLeaderBoard('awayTeam');
    const teams: ILeaderboardReturn[] = [];
    awayTeamData.forEach((awayTeam: ILeaderboardReturn) => {
      teamData.forEach((homeTeam) => {
        if (homeTeam.name === awayTeam.name) {
          const allMatchesStatsObj = LeaderboarUseCase.allStatsSum(homeTeam, awayTeam);
          teams.push(allMatchesStatsObj);
        }
      });
    });
    return sortTeamsService(teams);
  }
}
