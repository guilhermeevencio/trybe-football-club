import Match from '../../database/models/Match';
import {
  ICreatedMatch,
  IMatch,
  ICreateMatchRequestBody,
} from '../../interfaces/Matches';

const matchMock: IMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'São Paulo'
  },
  teamAway: {
    teamName: 'Grêmio'
  }
}

const createMatchMock: ICreateMatchRequestBody = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const createdPostResponseMock: ICreatedMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

export {
  matchMock,
  createMatchMock,
  createdPostResponseMock,
}