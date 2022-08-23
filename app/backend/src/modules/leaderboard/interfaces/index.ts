interface ILeaderboardReturn {
  name: string
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

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

export {
  ILeaderboardReturn,
  IRawLeaderboardData,
  IGoals,
};
