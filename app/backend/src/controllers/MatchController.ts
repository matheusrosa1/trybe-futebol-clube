import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getMatchesByQuery(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const transformingQuery = inProgress === 'true' ?? true;
    const { status, data } = await this.matchService
      .getMatchesByQuery(transformingQuery as boolean);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishingMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishingMatch(+id);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
