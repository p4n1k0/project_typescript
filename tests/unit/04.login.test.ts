import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);

describe('4 - Test endpoint POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  it('ao não receber um nome de usuário, retorne um erro', async function () {
    const data = await chai.request(app).post('/login').send({ username: undefined });

    expect(data.status).to.be.deep.eq(400);
    expect(data.body).to.be.deep.eq({ message: '"username" is required' });
  });

  it('ao não receber uma senha de usuário, retorne um erro', async function () {
    const data = await chai.request(app).post('/login').send(loginMock.noPasswordLoginBody);

    expect(data.status).to.be.deep.eq(400);
    expect(data.body).to.be.deep.eq({ message: '"password" is required' });
  });

  it('ao receber nome ou senha de usuário inválido, retorne um erro', async function () {
    const data = await chai.request(app).post('/login').send({ username: 'Gt', password: 1 });

    expect(data.status).to.be.deep.eq(401);
    expect(data.body).to.be.deep.eq({ message: 'Username or password invalid' });
  });

  it('ao receber username e senha válidos, retorne um token', async function () {
    const data = await chai.request(app).post('/login').send(loginMock.validLogin);

    expect(data.status).to.be.deep.eq(200);
    expect(data.body).to.be.deep.eq({ token: data.body.token });
  });
});
