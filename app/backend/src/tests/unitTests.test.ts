import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Team.mock';
import { invalidEmailLoginBody, invalidPasswordLoginBody, user, userRegistered, validLoginBody } from './mocks/User.mock';
import Jwt from '../utils/Jwt';
import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Routes', () => { 
  describe('/teams', function() {
    it('deve retornar todos os times (GET ALL)', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
  
      const {status, body} = await chai.request(app).get('/teams');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
    });
  
    it('deve retornar um time por id com sucesso (GET BY ID)', async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
      
      const { status, body } = await chai.request(app).get('/teams/1');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(team);
    })

    it('não deve retornar um time caso o id não exista', async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).get('/teams/999');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('Team 999 not found');
    });
  
  })
  describe('/login', function() {
    it('Testa se é possível fazer um login com sucesso e retorna um token (POST LOGIN)', async function() {
      sinon.stub(SequelizeTeam, 'findOne').resolves(userRegistered as any);
      sinon.stub(Jwt, 'sign').returns('validToken');
      sinon.stub(Validations, 'validateLogin').returns()

      const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

      expect(status).to.equal(200);
      expect(body).to.have.key('token');
    })

    it('não é possivel efetuar login com uma senha incorreta', async function () {
      sinon.stub(SequelizeTeam, 'findOne').resolves(invalidPasswordLoginBody as any);
      sinon.stub(Jwt, 'sign').returns('validToken');
      sinon.stub(Validations, 'validateLogin').returns();

      const { status, body } = await chai.request(app)
      .post('/login')
      .send(invalidPasswordLoginBody);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Invalid email or password');
    });


    it('não é possivel efetuar login com um email incorreto', async function () {
      sinon.stub(SequelizeTeam, 'findOne').resolves(invalidEmailLoginBody as any);
      sinon.stub(Jwt, 'sign').returns('validToken');
      sinon.stub(Validations, 'validateLogin').returns();

      const { status, body } = await chai.request(app)
      .post('/login')
      .send(invalidEmailLoginBody);

      expect(status).to.equal(401);
      expect(body.message).to.equal('Invalid email or password');
    })
  })

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

/*   it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  }); */
  afterEach(sinon.restore);
});