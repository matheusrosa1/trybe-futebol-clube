import ILeaderboard from './ILeaderboard';

type matchType = 'finalized' | 'home' | 'away';

export default interface ILeaderboardModel {
  getSortedLeaderboard(matchType: matchType): Promise<ILeaderboard[]>
}
