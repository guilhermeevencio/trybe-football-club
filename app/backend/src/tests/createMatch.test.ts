import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import Match from '../database/models/Match'
import User from '../database/models/User'
import { IMatch } from '../modules/matches/interfaces'
import {
  matchMock,
  createMatchMock,
  createdPostResponseMock,
  createMatchWithSameTeam,
  createMatchWithSameTeamMessage,
  createMatchWithWrongId,
  createMatchWithWrongIdMessage,
} from './mocks/matches.mock';
import { userMock } from './mocks/users.mock';

//@ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches.', () => {
  describe('Consulta os jogos.', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Match, "findAll").resolves([matchMock as unknown as Match]);
      chaiHttpResponse = await chai.request(app)
        .get('/matches')
    });

    afterEach(()=>{
      (Match.findAll as sinon.SinonStub).restore;
    });

    it('A requisição GET para a rota traz uma lista de partidas.', () => {
      expect(chaiHttpResponse).to.have.status(200);

      sinon.restore();
    });

    it('Deve retornar os as partidas', () => {
      const [matches] = chaiHttpResponse.body as IMatch[];

      expect(matches.id).to.equal(matchMock.id);
      expect(matches.homeTeam).to.equal(matchMock.homeTeam);
    });
  });

  describe('Salva uma partida', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Match, "create").resolves(createdPostResponseMock as Match);
      sinon.stub(jwt, "verify").callsFake(() => userMock as User);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(createMatchMock)
        .set('authorization', 'token');
    });

    afterEach(()=>{
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('A requisição retorna 201', () => {
      expect(chaiHttpResponse.status).to.equal(201);
    });

    it('A requisição retorna os dados da partida', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(createdPostResponseMock)
    });

    it('A requisição salva a partida com o status de inProgress como true.', () => {
      expect(chaiHttpResponse.body.inProgress).to.be.true;
    });
  });

  describe('Verifica que não é posível salvar uma partida com times iguais', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Match, "create").resolves(createdPostResponseMock as Match);
      sinon.stub(jwt, "verify").callsFake(() => userMock as User);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(createMatchWithSameTeam)
        .set('authorization', 'token');
    });

    afterEach(()=>{
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });    


    it('A requisição retorna 401', () => {
      expect(chaiHttpResponse.status).to.equal(401);
    });

    it('A requisição retorna a mensagem correta', () => {
      expect(chaiHttpResponse.body).to.deep.equal(createMatchWithSameTeamMessage);
    });
  })

  describe('Verifica se não é possível salvar partida com id incorreto.', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon.stub(Match, "create").resolves(createdPostResponseMock as Match);
      sinon.stub(jwt, "verify").callsFake(() => userMock as User);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .send(createMatchWithWrongId)
        .set('authorization', 'token');
    });

    afterEach(()=>{
      (Match.create as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('A requisição retorna 404', () => {
      expect(chaiHttpResponse.status).to.equal(404);
    });

    it('A requisição retorna a mensagem correta', () => {
      expect(chaiHttpResponse.body).to.deep.equal(createMatchWithWrongIdMessage);
    });
  });
});