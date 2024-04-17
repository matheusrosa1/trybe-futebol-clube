import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ILeaderboardModel from '../Interfaces/leaderboars/ILeaderboardModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class LeaderboardModel implements ILeaderboardModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async getTeams(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async getFinalizedMatches(): Promise<IMatch[]> {
    return this.matchModel.findAll({ where: { inProgress: false } });
  }

  async getMatchByTeamId(teamId: number): Promise<IMatch[]> {
    const getFinalizedMatches = await this.getFinalizedMatches();
    const matchesByTeam = getFinalizedMatches
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
    return matchesByTeam;
  }

  async getTotalGames(teamId: number): Promise<number> {
    return (await this.getMatchByTeamId(teamId)).length;
  }

  async getTotalVictories(teamId: number): Promise<number> {
    let numberVictories = 0;
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    matchesByTeam.forEach((match) => {
      if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        numberVictories += 1;
      }
      if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        numberVictories += 1;
      }
    });
    return numberVictories;
  }

  async getTotalDraws(teamId: number): Promise<number> {
    let numberDraws = 0;
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    matchesByTeam.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        numberDraws += 1;
      }
    });
    return numberDraws;
  }

  async getTotalLosses(teamId: number): Promise<number> {
    let numberLosses = 0;
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    matchesByTeam.forEach((match) => {
      if (match.awayTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        numberLosses += 1;
      }
      if (match.homeTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        numberLosses += 1;
      }
    });
    return numberLosses;
  }

  async getGoalsFavor(teamId: number): Promise<number> {
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    const countingGoalsFavor = matchesByTeam.reduce((goalsFavor, match) => {
      if (match.homeTeamId === teamId) {
        return Number(goalsFavor) + Number(match.homeTeamGoals);
      }
      return Number(goalsFavor) + Number(match.awayTeamGoals);
    }, 0);
    return countingGoalsFavor;
  }

  async getGoalsOwn(teamId: number): Promise<number> {
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    const countingGoalsFavor = matchesByTeam.reduce((goalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return goalsOwn + Number(match.awayTeamGoals);
      }
      return goalsOwn + Number(match.homeTeamGoals);
    }, 0);
    return countingGoalsFavor;
  }

  async getTotalPoints(teamId: number): Promise<number> {
    let points = 0;
    const matchesByTeam = await this.getMatchByTeamId(teamId);
    matchesByTeam.forEach((match) => {
      if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        points += 3;
      }
      if (match.awayTeamGoals === match.homeTeamGoals) {
        points += 1;
      }
    });
    return points;
  }

  /*   async calculateEfficiency(totalPoints: number, totalGames: number): Promise<number> {
    return (totalPoints / (totalGames * 3)) * 100;
  } */

  async getGoalsBalance(teamId: number): Promise<number> {
    return await this.getGoalsFavor(teamId) - await this.getGoalsOwn(teamId);
  }

  static getEficiency = (
    totalPoints: number,
    totalGames: number,
  ): number => (totalPoints / (totalGames * 3)) * 100;

  /*   async mapping(teams: Array) {
    const mapping = teams.map(async (team) => {
      const totalGames = await this.getTotalGames(team.id);
      const totalVictories = await this.getTotalVictories(team.id);
      const totalDraws = await this.getTotalDraws(team.id);
      const totalLosses = await this.getTotalLosses(team.id);
      const goalsFavor = await this.getGoalsFavor(team.id);
      const goalsOwn = await this.getGoalsOwn(team.id);
      const goalsBalance = await this.getGoalsBalance(team.id);
      const totalPoints = await this.getTotalPoints(team.id);
      const efficiency = LeaderboardModel.getEficiency(totalPoints, totalGames);
    });
    return mapping;
  } */

  async getLeaderboard(): Promise<Partial<ILeaderboard>[]> {
    const teams = await this.getTeams();
    const mappingTeams = teams.map(async (team) => (
      { name: team.teamName,
        totalPoints: await this.getTotalPoints(team.id),
        totalGames: await this.getTotalGames(team.id),
        totalVictories: await this.getTotalVictories(team.id),
        totalDraws: await this.getTotalDraws(team.id),
        totalLosses: await this.getTotalLosses(team.id),
        goalsFavor: await this.getGoalsFavor(team.id),
        goalsOwn: await this.getGoalsOwn(team.id),
        goalsBalance: await this.getGoalsBalance(team.id),
        efficiency: LeaderboardModel.getEficiency(
          await this.getTotalPoints(team.id),
          await this.getTotalGames(team.id),
        ),
      }
    ));
    return Promise.all(mappingTeams);
  }
}
