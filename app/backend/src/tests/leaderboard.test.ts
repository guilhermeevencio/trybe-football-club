import * as sinon from 'sinon';
import * as chai from 'chai';

import { ILeaderboardReturn } from '../modules/leaderboards/interfaces';
import { leaderBoardReturnMock } from './mocks/leaderBoards.mock';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
import Match from '../database/models/Match';
import { matchMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard', () => {
  describe('Filtrar as classificaçÕes dos times da casa', () => {
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
      chaiHttpResponse = await chai.request(app)
        .get('/leaderboard/home')
    });

    afterEach(()=>{
      (Match.findAll as sinon.SinonStub).restore;
    });

    it('A requisição GET para retorna status 200.', () => {
      expect(chaiHttpResponse).to.have.status(200);

      sinon.restore();
    });

    it('Deve retornar o leaderboard', () => {
      const [leaderBoard] = chaiHttpResponse.body as ILeaderboardReturn[];

      expect(leaderBoard.name).to.equal(leaderBoardReturnMock.name);
      expect(leaderBoard.totalPoints).to.equal(leaderBoardReturnMock.totalPoints);
    });
  });
});