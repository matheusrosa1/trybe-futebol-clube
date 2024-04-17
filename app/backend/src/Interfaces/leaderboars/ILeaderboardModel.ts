// .

import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardModel {
  getMinimalLeaderboard(): Promise<Partial<ILeaderboard>[]>;
  getLeaderboard(): Promise<ILeaderboard[]>;
}
