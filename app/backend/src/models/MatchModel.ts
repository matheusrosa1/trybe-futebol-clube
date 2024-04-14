import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import ITeam from '../Interfaces/teams/ITeam';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam' },
        { model: SequelizeTeam, as: 'awayTeam' }] });
    return dbData.map(({ id,
      homeTeamId,
      homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }: IMatch) => (
      { id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
        homeTeam: { teamName: homeTeam?.teamName } as ITeam,
        awayTeam: { teamName: awayTeam?.teamName } as ITeam,
      }));
  }

  async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
