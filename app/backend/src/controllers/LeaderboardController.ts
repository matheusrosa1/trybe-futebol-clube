import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getAllLeaderboards(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboardforAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getLeaderboardforHomeTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboardForHomeTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
