import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';
import TeamModel from '../models/TeamModel';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

  public async getLeaderboardforAllMatches() {
    const leaderboards = await this.leaderboardModel.getLeaderboard('finalized');

    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async getLeaderboardForHomeTeams(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboardsHomeTeams = await this.leaderboardModel.getMinimalLeaderboard('home');

    return { status: 'SUCCESSFUL', data: leaderboardsHomeTeams };
  }

  public async getLeaderboardForAwayTeams(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboardsHomeTeams = await this.leaderboardModel.getMinimalLeaderboard('away');

    return { status: 'SUCCESSFUL', data: leaderboardsHomeTeams };
  }
}
