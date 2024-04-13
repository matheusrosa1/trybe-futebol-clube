import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Team.mock';
import { invalidEmailLoginBody, invalidPasswordLoginBody, roleAdmin, user, userRegistered, validLoginBody } from './mocks/User.mock';
import Jwt from '../utils/Jwt';
import Validations from '../middlewares/Validations';
import SequelizeUser from '../database/models/SequelizeUser';

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
    describe('/teams/:id', function() {
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
    describe('/login/role', function() {
      it('é possível obter a role de um token válido', async function() {
        const token = 'seu-token-aqui';
        const role = 'admin';
        const roleReturn = { role };
  
        // Configurando stubs
        sinon.stub(Jwt, 'verify').returns({ role }); // Mock de verificação do token
        sinon.stub(Validations, 'validateToken').resolves(); // Mock de validação do token
        sinon.stub(SequelizeUser, 'findOne').resolves(roleReturn as any); // Mock de consulta de usuário
  
        // Fazendo a requisição à rota de login
        const res = await chai.request(app)
          .get('/login/role')
          .set('authorization', `Bearer ${token}`); // Adicionando o token de autorização no cabeçalho
  
        // Verificações
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('role').that.equals(role);
      })
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
