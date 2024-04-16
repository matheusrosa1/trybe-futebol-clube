import { DataTypes, Model, QueryInterface } from "sequelize";
import ILeaderboard from '../../Interfaces/leaderboars/ILeaderboard'

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ILeaderboard>>('leaderboards', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      totalPoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_points',
      },
      totalGames: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_games',
      },
      totalVictories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_victories',
      },
      totalDraws: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_draws',
      },
      totalLosses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total_losses',
      },
      goalsFavor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'goals_favor',
      },
      goalsOwn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'goals_own',
      },
      goalsBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'goals_balance',
      },
      efficiency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  }
}