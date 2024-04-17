// .

import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardModel {
  getLeaderboard(): Promise<Partial<ILeaderboard>[]>;
}
