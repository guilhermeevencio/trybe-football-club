import * as sinon from 'sinon';
import * as chai from 'chai';

import { ILeaderboardReturn } from '../modules/leaderboard/interfaces';
import { leaderBoardReturnMock } from './mocks/leaderBoards.mock';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
import Match from '../database/models/Match';
import { matchMock } from './mocks/matches.mock';
import Team from '../database/models/Team';
import { ITeam } from '../interfaces/Teams';
import { awayTeamMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 14,
  teamName: 'Santos'
}

describe('Rota /leaderboard/home', () => {
  describe('Filtrar as classificaçÕes dos times da casa', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon.restore()
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
      sinon.stub(Team, "findAll").resolves([teamMock as unknown as Team]);
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/home')
    });

    afterEach(()=>{
      sinon.restore()
      // (Match.findAll as sinon.SinonStub).restore;
      // (Team.findAll as sinon.SinonStub).restore;
    });

    it('A requisição GET para retorna status 200.', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve retornar o leaderboard', () => {
      const [leaderBoard] = chaiHttpResponse.body as ILeaderboardReturn[];

      expect(leaderBoard.name).to.equal(leaderBoardReturnMock.name);
      expect(leaderBoard.totalPoints).to.equal(3);
      expect(leaderBoard.totalVictories).to.equal(1);
      expect(leaderBoard.totalDraws).to.equal(0);
      expect(leaderBoard.totalLosses).to.equal(0);
      expect(leaderBoard.goalsFavor).to.equal(2);
      expect(leaderBoard.goalsOwn).to.equal(1);
    });
  });
});

describe('Rota /leaderboard/away', () => {
  describe('Filtrar as classificaçÕes dos times da casa', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon.restore()
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
      sinon.stub(Team, "findAll").resolves([awayTeamMock as unknown as Team]);
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/away')
    });

    afterEach(()=>{
      sinon.restore()
    });

    it('A requisição GET para retorna status 200.', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Deve retornar o leaderboard', () => {
      const [leaderBoard] = chaiHttpResponse.body as ILeaderboardReturn[];

      expect(leaderBoard.name).to.equal('São Paulo');
      expect(leaderBoard.totalPoints).to.equal(0);
      expect(leaderBoard.totalVictories).to.equal(0);
      expect(leaderBoard.totalDraws).to.equal(0);
      expect(leaderBoard.totalLosses).to.equal(1);
      expect(leaderBoard.goalsFavor).to.equal(1);
      expect(leaderBoard.goalsOwn).to.equal(2);
    });
  });
});