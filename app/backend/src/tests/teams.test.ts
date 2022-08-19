import * as sinon from 'sinon';
import * as chai from 'chai';

import Team from '../database/models/Team'
import { ITeam } from '../interfaces/Teams'

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
import { LoginRequest, IUser } from '../interfaces/User'

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeam = {
  id: 1,
  teamName: 'Fluminense'
}

describe('Rota /teams', () => {
  describe('Consulta os Times', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
      .stub(Team, "findAll")
      .resolves([teamMock as Team]);
      chaiHttpResponse = await chai.request(app)
        .get('/teams')
    });

    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore;
    })

    it('A requisição GET para a rota traz uma lista de times.', () => {
      expect(chaiHttpResponse).to.have.status(200);

      sinon.restore();
    })

    it('Deve retornar os times', () => {
      const [team] = chaiHttpResponse.body as ITeam[];

      expect(team.id).to.equal(teamMock.id);
      expect(team.teamName).to.equal(teamMock.teamName);
    })
  })

  describe('Consulta por time específico pelo id', () => {
    let chaiHttpResponse: Response;
    const teamId = 1

    beforeEach(async () => {
      sinon
      .stub(Team, "findOne")
      .resolves(teamMock as Team);
      chaiHttpResponse = await chai.request(app)
        .get(`/teams/${teamId}`)
    });

    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore;
    })

    it('Deve retornar o time', () => {
      const team = chaiHttpResponse.body as ITeam;

      expect(team.id).to.equal(teamMock.id);
      expect(team.teamName).to.equal(teamMock.teamName);
    })
  })
})