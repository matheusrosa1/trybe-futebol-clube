import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/matches/IMatch';
import TeamModel from '../models/TeamModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByQuery(q: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matchesByQuery = await this.matchModel.findByQuery(q);
    return { status: 'SUCCESSFUL', data: matchesByQuery };
  }

  public async finishingMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const findMatch = await this.matchModel.findById(id);

    if (!findMatch) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    }

    const turnFinished = findMatch.inProgress === false;
    await this.matchModel.update(id, { inProgress: turnFinished });
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, data: IMatch) {
    const findMatch = await this.matchModel.findById(id);

    if (!findMatch) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const updatedMatch = await this.matchModel.update(id, data);

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  public async createMatch(data: Partial<Omit<IMatch, 'inProgress'>>):
  Promise<ServiceResponse<IMatch>> {
    const findHomeTeam = await this.teamModel.findById(data.homeTeamId as number);
    const findAwayTeam = await this.teamModel.findById(data.awayTeamId as number);
    if (findHomeTeam == null || findAwayTeam == null) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    if (findHomeTeam.id === findAwayTeam.id) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const newMatchData = { ...data, inProgress: true };
    const newMatch = await this.matchModel.create(newMatchData);
    return { status: 'CREATED', data: newMatch };
  }
}
