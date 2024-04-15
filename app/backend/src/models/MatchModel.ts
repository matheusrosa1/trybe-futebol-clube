/* import { Op } from 'sequelize'; */
import IMatchModel from '../Interfaces/matches/IMatchModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatch from '../Interfaces/matches/IMatch';
/* import ITeam from '../Interfaces/teams/ITeam'; */

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findById(id: number): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findByQuery(q: string): Promise<IMatch[]> {
    return this.model.findAll({
      where: {
        inProgress: q === 'true',
      },
    });
  }
}
