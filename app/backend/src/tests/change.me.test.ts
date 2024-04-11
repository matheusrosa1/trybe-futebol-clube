import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => { 
  describe('GET /teams', function() {
    it('deve retornar todos os times', async function() {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
  
      const {status, body} = await chai.request(app).get('/teams');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
    });
  
    it('deve retornar um time por id com sucesso', async function() {
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
