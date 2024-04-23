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
import SequelizeUser from '../database/models/SequelizeUser';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matchFinished, matchInProgress, matchMock, matches, matchesInProgress, matchesIsNotInProgress } from './mocks/Match.mock';
import { match } from 'assert';
import { matchesForLeaderboard, sortedLeaderBoards, teamsForLeaderboard } from './mocks/Leaderboard.mock';

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
      sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
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
      it('não é possível obter a role de um token inválido', async function() {
        const token = 'token-inválido';
  
        sinon.stub(Jwt, 'verify').returns('Token must be a valid token');
  
        const res = await chai.request(app).get('/login/role').set('authorization', `Bearer ${token}`);
  
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Token must be a valid token');
      })
    })
    it('Não é possível obter a role com um token não informado', async function() {
      sinon.stub(Jwt, 'verify').returns('Token not found');
      const res = await chai.request(app).get('/login/role');
  
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Token not found');
    })
    })
  describe('/matches', function() {
    it('é possível obter todas as listas de partidas', async function() {
       sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matches); 
    })
    it('é possível obter a lista de partidas em andamento quando a query for solicitada', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=true');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesInProgress);
    })
    it('é possível obetr a lista de partidas que não estão em danamento quando a query for solicitada', async function() {
      sinon.stub(SequelizeMatch, 'findAll').resolves(matchesIsNotInProgress as any);

      const { status, body } = await chai.request(app).get('/matches?inProgress=false');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesIsNotInProgress);
    })
    describe('/POST', function() {
      it(' é possível criar uma partida com sucesso', async function() {
        sinon.stub(SequelizeMatch, 'create').resolves(matchMock as any);
        sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
        sinon.stub(Jwt, 'verify').resolves();
  
        const { status, body } = await chai
          .request(app)
          .post('/matches')
          .send(matchMock)
          .set('authorization', 'Bearer token');
  
        expect(status).to.equal(201);
        expect(body).to.deep.equal(matchMock);
      })
    })
    it('não é possível criar uma partida com um time que não existe', async function() {  
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
      sinon.stub(Jwt, 'verify').resolves();
  
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send(matchMock)
        .set('authorization', 'Bearer token');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('There is no team with such id!');
    })
    it('não é possível criar uma partida com dois times iguais', async function() {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
      sinon.stub(Jwt, 'verify').resolves();
  
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .send({ ...matchMock, awayTeamId: 1, homeTeamId: 1 })
        .set('authorization', 'Bearer token');
  
      expect(status).to.equal(422);
      expect(body.message).to.equal('It is not possible to create a match with two equal teams');
    })
    describe('/matches/:id/finish', function() {
      it('é possível finalizar uma partida com sucesso', async function() {
        /*         const match = matches[0]; */
        sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
        sinon.stub(SequelizeMatch, 'findByPk').resolves(matchFinished as any);
        sinon.stub(Jwt, 'verify').resolves();
        
        const { status, body } = await chai
          .request(app)
          .patch('/matches/1/finish')
          .set('authorization', 'Bearer token');

        expect(status).to.equal(200);
        expect(body.message).to.equal('Finished');
      })
       it('não é possível finalizar uma partida que não existe', async function() {
        sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
        sinon.stub(Jwt, 'verify').resolves();

        const { status, body } = await chai.request(app).patch('/matches/999/finish').set('authorization', 'Bearer token');;

        expect(status).to.equal(404);
        expect(body.message).to.equal('Match 999 not found');
      }) 
      describe('/matches/:id', function() {
        it('é possível fazer um update de uma partida com sucesso', async function() {
          sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
          sinon.stub(SequelizeMatch, 'findByPk').resolves(matchMock as any);
          sinon.stub(Jwt, 'verify').resolves();

          const { id, ...sendData } = matchMock;
  
          const { status, body } = await chai
            .request(app)
            .patch('/matches/1')
            .send(sendData)
            .set('authorization', 'Bearer token');
  
          expect(status).to.equal(200);
          expect(body).to.deep.equal(matchMock);
        })
        it('não é possível fazer um update de uma partida que não existe', async function() {
          sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
          sinon.stub(Jwt, 'verify').resolves();
  
          const { status, body } = await chai.request(app).patch('/matches/999').set('authorization', 'Bearer token');
  
          expect(status).to.equal(404);
          expect(body.message).to.equal('There is no team with such id!');
        })
      })
    })
    describe('/leaderboard', function() {
      it('é possível obter o leaderboard de todos os times', async function() {
        sinon.stub(SequelizeMatch, 'findAll').resolves(matchesForLeaderboard as any);
        sinon.stub(SequelizeTeam, 'findAll').resolves(teamsForLeaderboard as any);
  
        const { status, body } = await chai.request(app).get('/leaderboard');
  
        expect(status).to.equal(200);
        expect(body).to.deep.equal(sortedLeaderBoards);
      })
      describe('/leaderboard/home', function() {
        it('é possível obtero leaderboard dos times de casa', async function() {
          sinon.stub(SequelizeMatch, 'findAll').resolves(matchesForLeaderboard as any);
          sinon.stub(SequelizeTeam, 'findAll').resolves(teamsForLeaderboard as any);
    
          const { status, body } = await chai.request(app).get('/leaderboard/home');
    
          expect(status).to.equal(200);
          expect(body).to.deep.equal(sortedLeaderBoards);
        })
      });
      describe('/leaderboard/away', function() {
        it('é possível obter o leaderboard dos times de fora', async function() {
          sinon.stub(SequelizeMatch, 'findAll').resolves(matchesForLeaderboard as any);
          sinon.stub(SequelizeTeam, 'findAll').resolves(teamsForLeaderboard as any);
    
          const { status, body } = await chai.request(app).get('/leaderboard/away');
    
          expect(status).to.equal(200);
          expect(body).to.deep.equal(sortedLeaderBoards);
        })
      })
      })
  })
  
  afterEach(sinon.restore);
});