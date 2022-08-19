export interface ITeam {
  id: number
  teamName: string
}

export interface ITeamsUseCase {
  execute(): Promise<ITeam[]>
}
