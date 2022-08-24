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

interface ITeamInfoResults {
  wons: number
  draws: number
  losses: number
  goalsFavor: number
  goalsOwn: number
  name: string
}

export {
  ILeaderboardReturn,
  ITeamInfoResults,
};
