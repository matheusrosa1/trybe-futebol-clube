import { Identifiable } from '..';

type teamNameType = {
  teamName: string;
};

export default interface IMatch extends Identifiable {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: teamNameType;
  awayTeam?: teamNameType
}
