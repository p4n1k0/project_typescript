import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import userMock from './mocks/user.mock';

chai.use(chaiHttp);

describe('2 - Test endpoint /users', function () {
    beforeEach(async function () { sinon.restore() });
    it('cadastro de usuário', async function () {
        const data = await chai.request(app).post('/users').send(userMock.user);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ token: data.body.token });
    });

    it('ao não receber um nome de usuário, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send({ username: undefined });

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"username" is required' });
    });

    it('ao receber um número no username, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send({ username: 1 });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"username" must be a string' });
    });

    it('nome de usuário recebe 2 caracteres, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send({ username: 'Gt' });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"username" length must be at least 3 characters long' });
    });

    it('ao não receber o campo classe, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noClasseUser);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"classe" is required' });
    });

    it('ao receber um número na classe, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noClasseString);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"classe" must be a string' });
    });

    it('classe de usuário recebe 2 caracteres, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noClasseCharacter);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"classe" length must be at least 3 characters long' });
    });

    it('ao não receber um level de usuário, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noLevelUser);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"level" is required' });
    });

    it('ao receber uma string no level, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noLevelNumber);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"level" must be a number' });
    });

    it('level de usuário >= 0, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.levelNumberZero);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"level" must be greater than or equal to 1' });
    });

    it('ao não receber uma senha de usuário, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noPasswordUser);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"password" is required' });
    });

    it('ao receber um número na senha, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noPasswordString);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"password" must be a string' });
    });

    it('senha de usuário recebe caracteres < 8, retorne um erro', async function () {
        const data = await chai.request(app).post('/users').send(userMock.noPasswordCharacter);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"password" length must be at least 8 characters long' });
    });
});
