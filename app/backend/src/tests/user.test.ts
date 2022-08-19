import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../database/models/User'
import UserLoginUseCase from '../modules/users/useCases/userLogin/UserLoginUseCase';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { LoginRequest, IUser } from '../interfaces/User'

import { Response } from 'superagent';
import TokenService from '../services/TokenService';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'guilherme',
  email: 'guilherme@email.com',
  role: 'Admin',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const loginRequest: LoginRequest = {
  email: "admin@admin.com",
  password: "secret_admin",
}

describe('Rota /user', () => {

  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('retorna status 200', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginRequest)
    
    expect(response.status).to.equal(200);
  })

  it('Retorna o user', async () => {
    const response = await chai
       .request(app)
       .post('/login')
       .send(loginRequest)

    expect(response.body.token).to.be.a('string');
  });
});

describe.only('Rota /user/validate', () => { 
  let chaiHttpResponse: Response;

  beforeEach(() => {
    sinon.stub(User, "findOne").resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('retorna status 200', async  () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', 'token')
      .send()
    
    expect(response.status).to.equal(200);
  })
})