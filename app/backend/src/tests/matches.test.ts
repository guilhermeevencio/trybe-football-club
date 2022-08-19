import * as sinon from 'sinon';
import * as chai from 'chai';

import Match from '../database/models/Match'

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'

chai.use(chaiHttp);

const { expect } = chai;

interface IMatchMock {
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

const matchMock: IMatchMock = {
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

describe('Rota /matches.', () => {
  describe('Consulta os jogos.', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
    })

    afterEach(()=>{
      (Match.findAll as sinon.SinonStub).restore;
    })

    it('A requisição GET para a rota traz uma lista de partidas.', () => {
      expect(chaiHttpResponse).to.have.status(200);

      sinon.restore();
    })

    it('Deve retornar os as partidas', () => {
      const [matches] = chaiHttpResponse.body as IMatchMock[];

      expect(matches.id).to.equal(matchMock.id);
      expect(matches.homeTeam).to.equal(matchMock.homeTeam);
    })
  })
})