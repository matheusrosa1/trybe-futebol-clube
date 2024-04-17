import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async getAllLeaderboard(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboards = await this.leaderboardModel.getMinimalLeaderboard();

    return { status: 'SUCCESSFUL', data: leaderboards };
  }
}
