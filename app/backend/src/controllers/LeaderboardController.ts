import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getAllLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getAllLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
