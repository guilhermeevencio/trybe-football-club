import Match from '../../database/models/Match';
import {
  ICreatedMatch,
  IMatch,
  ICreateMatchRequestBody,
} from '../../modules/matches/interfaces';

const matchMock: IMatch = 	{
  id: 14,
  homeTeam: 14,
  homeTeamGoals: 2,
  awayTeam: 16,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'Santos'
  },
  teamAway: {
    teamName: 'São Paulo'
  }
}

const createMatchMock: ICreateMatchRequestBody = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const createMatchWithSameTeam: ICreateMatchRequestBody = {
  homeTeam: 8,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const createMatchWithSameTeamMessage = {
  message: 'It is not possible to create a match with two equal teams',
}

const createMatchWithWrongId: ICreateMatchRequestBody = {
  homeTeam: 88,
  awayTeam: 48,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const createMatchWithWrongIdMessage = {
  message: 'There is no team with such id!',
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
  createMatchWithSameTeam,
  createMatchWithSameTeamMessage,
  createMatchWithWrongId,
  createMatchWithWrongIdMessage,
}