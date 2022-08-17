import * as sinon from 'sinon';
import * as chai from 'chai';
import User from '../../database/models/User'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import { UserRequest, IUser } from '../../interfaces/User'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  email: 'guilherme@email.com',
  role: 'Admin',
  password: '1235456'
}

const loginRequest: UserRequest = {
  name: 'guilherme',
  email: 'guilherme@email.com',
}

describe('User', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('retorna status 201', async  () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginRequest)
    
    expect(response.status).to.equal(201);
  })

  it('Retorna o user', async () => {
    const response = await chai
       .request(app)
       .post('/login')
       .send(loginRequest)

    expect(chaiHttpResponse.body).to.be.equal([]);
  });
});