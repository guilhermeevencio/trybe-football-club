import { ILeaderboardReturn } from '../modules/leaderboard/interfaces';

export default function sortTeamsService(teams: ILeaderboardReturn[]) {
  const sortedTeams = teams;
  sortedTeams.sort((a: ILeaderboardReturn, b: ILeaderboardReturn) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
  return sortedTeams;
}
