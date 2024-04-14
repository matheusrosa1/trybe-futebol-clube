import { Identifiable } from '..';
import ITeam from '../teams/ITeam';

export default interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: Omit<ITeam, 'id'>;
  awayTeam?: Omit<ITeam, 'id'>;
}
