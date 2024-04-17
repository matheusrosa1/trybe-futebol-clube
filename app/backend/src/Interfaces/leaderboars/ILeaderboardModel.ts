// .

import ILeaderboard from './ILeaderboard';

type matchType = 'finalized' | 'home' | 'away';

export default interface ILeaderboardModel {
  getMinimalLeaderboard(matchType: matchType): Promise<Partial<ILeaderboard>[]>;
  getLeaderboard(matchType: matchType): Promise<ILeaderboard[]>;
}
