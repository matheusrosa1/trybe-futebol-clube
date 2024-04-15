import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByQuery(q: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesByQuery = await this.matchModel.findByQuery(q);
    return { status: 'SUCCESSFUL', data: matchesByQuery };
  }

  public async finishingMatch(
    id: number,
    /* finishedStatus: IMatch['inProgress'], */
  ): Promise<ServiceResponse | ServiceMessage> {
    const findMatch = await this.matchModel.findById(id);
    if (findMatch?.inProgress === false) {
      return { status: 'CONFLICT',
        data: { message: 'Não é possível finalizar uma partida já finalizada' } };
    }
    await this.matchModel.update(id);
  }
}
