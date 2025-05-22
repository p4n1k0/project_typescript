import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);

describe('3 - Test endpoint /orders', function () {
    let token: string;
    beforeEach(async function () {
        sinon.restore();

        const data = await chai.request(app).post('/login').send(loginMock.validLogin);

        token = data.body.token;
    });

    it('status 200 ao receber todos os pedidos', async function () {

        const data = await chai.request(app).get('/orders').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('ao tentar fazer requisição de produtos sem token, retorne um erro', async function () {
        const data = await chai.request(app).post('/orders').send({ productsIds: [1, 2] });

        expect(data.status).to.be.deep.eq(401);
        expect(data.body).to.be.deep.eq({ message: 'Token not found' });
    });

    it('ao tentar fazer requisição de produtos com token inválido, retorne um erro', async function () {
        const data = await chai.request(app).post('/orders').send({ productsIds: [1, 2] }).set('Authorization', 'Bearer 123');

        expect(data.status).to.be.deep.eq(401);
        expect(data.body).to.be.deep.eq({ message: 'Invalid token' });
    });

    it('ao tentar fazer requisição sem o campo productsIds, retorne um erro', async function () {
        const data = await chai.request(app).post('/orders').send({}).set('Authorization', token);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"productsIds" is required' });
    });

    it('ao criar um pedido com campo productsIds não sendo array, retorne um erro', async function () {
        const data = await chai.request(app).post('/orders').send({ productsIds: 1 }).set('Authorization', token);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"productsIds" must be an array' });
    });

    it('ao criar um pedido no campo productsIds com array vazio, retorne um erro', async function () {
        const data = await chai.request(app).post('/orders').send({ productsIds: [] }).set('Authorization', token);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"productsIds" must include only numbers' });
    });

    it('cria pedido com sucesso com 1 item', async function () {
        const data = await chai.request(app).post('/orders').send({ productsIds: [1] }).set('Authorization', token);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ userId: data.body.userId, productsIds: [1] });
    });
});
