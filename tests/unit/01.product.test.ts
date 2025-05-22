import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import productMock from './mocks/product.mock';
import connection from '../../src/models/connection';

chai.use(chaiHttp);

describe('1 - Test endpoint /products', function () {
    beforeEach(function () { sinon.restore(); });

    it('ao receber name e amount de produtos validos, cadastra produto', async function () {
        const data = await chai.request(app).post('/products').send(productMock.validProduct);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ id: data.body.id, name: productMock.validProduct.name, amount: productMock.validProduct.amount });
    });

    it('retorna todos os produtos com status 200', async function () {
        const data = await chai.request(app).get('/products').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('ao não receber um nome, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send({ name: undefined });

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"name" is required' });
    });

    it('nome recebe um número, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send({ name: 1 });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"name" must be a string' });
    });

    it('nome de produto recebe 2 caracteres, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send({ name: 'Gt' });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"name" length must be at least 3 characters long' });
    });

    it('ao não receber um amount, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send(productMock.noProductAmount);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"amount" is required' });
    });

    it('amount recebe um número, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send({ name: productMock.validProduct.name, amount: 1 });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"amount" must be a string' });
    });

    it('amount recebe 2 caracteres, retorne um erro', async function () {
        const data = await chai.request(app).post('/products').send({ name: productMock.validProduct.name, amount: 'Gt' });

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: '"amount" length must be at least 3 characters long' });
    });
    
});
