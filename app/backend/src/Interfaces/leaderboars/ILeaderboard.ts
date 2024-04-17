import ITeam from '../teams/ITeam';

export default interface ILeaderboard {
  name: ITeam['teamName'];
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
