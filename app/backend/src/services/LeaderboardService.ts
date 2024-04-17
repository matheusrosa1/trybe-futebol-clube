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

  public async getLeaderboardForHomeTeams(): Promise<ServiceResponse<Partial<ILeaderboard>[]>> {
    const leaderboards = await this.leaderboardModel.getMinimalLeaderboard();

    const filteringByHomeTeams = leaderboards.map(async (leaderboard) => {
      const teamIdByName = await this.teamModel.findByName(leaderboard.name as string);
      const team = await this.teamModel.findById(teamIdByName as number);
      return { ...leaderboard, name: team?.teamName };
    });
    const filteringPromise = await Promise.all(filteringByHomeTeams);
    return { status: 'SUCCESSFUL', data: filteringPromise };
  }
}
