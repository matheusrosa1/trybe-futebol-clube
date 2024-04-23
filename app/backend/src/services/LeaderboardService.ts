import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async getLeaderboardforAllMatches() {
    const leaderboards = await this.leaderboardModel.getSortedLeaderboard('finalized');

    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async getLeaderboardForHomeTeams(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboardsHomeTeams = await this.leaderboardModel.getSortedLeaderboard('home');

    return { status: 'SUCCESSFUL', data: leaderboardsHomeTeams };
  }

  public async getLeaderboardForAwayTeams(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboardsHomeTeams = await this.leaderboardModel.getSortedLeaderboard('away');

    return { status: 'SUCCESSFUL', data: leaderboardsHomeTeams };
  }
}
