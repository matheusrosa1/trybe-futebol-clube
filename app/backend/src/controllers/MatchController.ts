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
    const { status, data } = await this.matchService.getMatchesByQuery(inProgress as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
