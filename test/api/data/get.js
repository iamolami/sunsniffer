process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http')
const should = chai.should();
const request = require('supertest')

const app = require('../../../app')

chai.use(chaiHttp);

describe('Test Data Collection', () => {

    it('Test API welcome route...', (done) => {
        chai.request(app)
            .get('/api/welcome')
            .end((_err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                const actualVal = res.body.message;
                expect(actualVal).to.be.equal('Welcome to Sunsniffer API');
                done();
            })
    })

    it('should verify that we have data in the Database', (done) => {
        chai.request(app)
            .get('/api/suggestions?q=lond&latitude=42.98339&longitude=-81.23304')
            .end((_err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('should test two values....', () => {
        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal);
    })

})