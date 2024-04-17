import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async getAllLeaderboard(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const allLeaderBoards = await this.leaderboardModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: allLeaderBoards };
  }
}
