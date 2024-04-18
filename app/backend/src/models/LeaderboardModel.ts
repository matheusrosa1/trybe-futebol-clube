import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ILeaderboardModel from '../Interfaces/leaderboars/ILeaderboardModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export type matchType = 'finalized' | 'home' | 'away';

export default class LeaderboardModel implements ILeaderboardModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async getTeams(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async getAllFinalizedMatches(): Promise<IMatch[]> {
    return this.matchModel.findAll({ where: { inProgress: false } });
  }

  async getFinalizedMatchesForHomeTeams(teamId: number): Promise<IMatch[]> {
    return this.matchModel.findAll({ where: { inProgress: false, homeTeamId: teamId } });
  }

  async getFinalizedMatchesForAwayTeams(teamId: number): Promise<IMatch[]> {
    return this.matchModel.findAll({ where: { inProgress: false, awayTeamId: teamId } });
  }

  async getMatchesByTeamId(teamId: number, matchType: matchType): Promise<IMatch[]> {
    let getMatches: IMatch[];

    switch (matchType) {
      case 'finalized':
        getMatches = await this.getAllFinalizedMatches();
        break;
      case 'home':
        getMatches = await this.getFinalizedMatchesForHomeTeams(teamId);
        break;
      case 'away':
        getMatches = await this.getFinalizedMatchesForAwayTeams(teamId);
        break;
      default:
        getMatches = await this.getAllFinalizedMatches();
    }
    const matchesByTeam = getMatches
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
    return matchesByTeam;
  }

  async getTotalGames(teamId: number, matchType: matchType): Promise<number> {
    return (await this.getMatchesByTeamId(teamId, matchType)).length;
  }

  async getTotalVictories(teamId: number, matchType: matchType): Promise<number> {
    let numberVictories = 0;
    const matchesByTeam = await this.getMatchesByTeamId(teamId, matchType);
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

  async getTotalDraws(teamId: number, matchType: matchType): Promise<number> {
    let numberDraws = 0;
    const matchesByTeam = await this.getMatchesByTeamId(teamId, matchType);
    matchesByTeam.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        numberDraws += 1;
      }
    });
    return numberDraws;
  }

  async getTotalLosses(teamId: number, matchType: matchType): Promise<number> {
    let numberLosses = 0;
    const matchesByTeam = await this.getMatchesByTeamId(teamId, matchType);
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

  async getGoalsFavor(teamId: number, matchType: matchType): Promise<number> {
    const matchesByTeam = await this.getMatchesByTeamId(teamId, matchType);
    const countingGoalsFavor = matchesByTeam.reduce((goalsFavor, match) => {
      if (match.homeTeamId === teamId) {
        return Number(goalsFavor) + Number(match.homeTeamGoals);
      }
      return Number(goalsFavor) + Number(match.awayTeamGoals);
    }, 0);
    return countingGoalsFavor;
  }

  async getGoalsOwn(teamId: number, matchType: matchType): Promise<number> {
    const matchesByTeam = await this.getMatchesByTeamId(teamId, matchType);
    const countingGoalsFavor = matchesByTeam.reduce((goalsOwn, match) => {
      if (match.homeTeamId === teamId) {
        return goalsOwn + Number(match.awayTeamGoals);
      }
      return goalsOwn + Number(match.homeTeamGoals);
    }, 0);
    return countingGoalsFavor;
  }

  async getTotalPoints(teamId: number, matchType: matchType): Promise<number> {
    const totalVictories = await this.getTotalVictories(teamId, matchType);
    const totalDraws = await this.getTotalDraws(teamId, matchType);
    return (totalVictories * 3) + totalDraws;
  }

  async getGoalsBalance(teamId: number, matchType: matchType): Promise<number> {
    return await this.getGoalsFavor(teamId, matchType) - await this.getGoalsOwn(teamId, matchType);
  }

  static getEficiency = (
    totalPoints: number,
    totalGames: number,
  ): string => ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

  async getMinimalLeaderboard(matchType: matchType): Promise<Partial<ILeaderboard>[]> {
    const teams = await this.getTeams();
    const mappingTeams = teams.map(async (team) => (
      { name: team.teamName,
        totalPoints: await this.getTotalPoints(team.id, matchType),
        totalGames: await this.getTotalGames(team.id, matchType),
        totalVictories: await this.getTotalVictories(team.id, matchType),
        totalDraws: await this.getTotalDraws(team.id, matchType),
        totalLosses: await this.getTotalLosses(team.id, matchType),
        goalsFavor: await this.getGoalsFavor(team.id, matchType),
        goalsOwn: await this.getGoalsOwn(team.id, matchType),
      }
    ));
    return Promise.all(mappingTeams);
  }

  async getLeaderboard(matchType: matchType): Promise<ILeaderboard[]> {
    const teams = await this.getTeams();
    const mappingTeams = teams.map(async (team) => (
      { name: team.teamName,
        totalPoints: await this.getTotalPoints(team.id, matchType),
        totalGames: await this.getTotalGames(team.id, matchType),
        totalVictories: await this.getTotalVictories(team.id, matchType),
        totalDraws: await this.getTotalDraws(team.id, matchType),
        totalLosses: await this.getTotalLosses(team.id, matchType),
        goalsFavor: await this.getGoalsFavor(team.id, matchType),
        goalsOwn: await this.getGoalsOwn(team.id, matchType),
        goalsBalance: await this.getGoalsBalance(team.id, matchType),
        efficiency: LeaderboardModel.getEficiency(
          await this.getTotalPoints(team.id, matchType),
          await this.getTotalGames(team.id, matchType),
        ),
      }
    ));
    return Promise.all(mappingTeams);
  }

  async getLeaderboardSortedByPoints(matchType: matchType): Promise<ILeaderboard[]> {
    const allLeaderboard = await this.getLeaderboard(matchType);
    return allLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  async getLeaderboardByVictories(matchType: matchType):Promise<ILeaderboard[]> {
    const sortedByPointsLeaderboard = await this.getLeaderboardSortedByPoints(matchType);
    for (let index = 0; index < sortedByPointsLeaderboard.length - 1; index += 1) {
      const leaderboard = sortedByPointsLeaderboard[index];
      const nextLeaderboard = sortedByPointsLeaderboard[index + 1];
      if (leaderboard.totalPoints === nextLeaderboard.totalPoints) {
        return sortedByPointsLeaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
      }
    }
    return sortedByPointsLeaderboard;
  }

  async getLeaderboardByGoalsBalance(matchType: matchType): Promise<ILeaderboard[]> {
    const sortedByVictoriesLeaderboard = await this.getLeaderboardByVictories(matchType);
    for (let index = 0; index < sortedByVictoriesLeaderboard.length - 1; index += 1) {
      const leaderboard = sortedByVictoriesLeaderboard[index];
      const nextLeaderboard = sortedByVictoriesLeaderboard[index + 1];
      if (leaderboard.totalVictories === nextLeaderboard.totalVictories) {
        return sortedByVictoriesLeaderboard.sort((a, b) => {
          if (a.goalsFavor < 0 && b.goalsFavor < 0) return a.goalsBalance - b.goalsBalance;
          return b.goalsBalance - a.goalsBalance;
        });
      }
    }
    return sortedByVictoriesLeaderboard;
  }

  async getSortedLeaderboard(matchType: matchType): Promise<ILeaderboard[]> {
    const sortedBByGoalsBalanceLaderboard = await this.getLeaderboardByGoalsBalance(matchType);
    for (let index = 0; index < sortedBByGoalsBalanceLaderboard.length - 1; index += 1) {
      const leaderboard = sortedBByGoalsBalanceLaderboard[index];
      const nextLeaderboard = sortedBByGoalsBalanceLaderboard[index + 1];
      if (leaderboard.goalsBalance === nextLeaderboard.goalsBalance) {
        return sortedBByGoalsBalanceLaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
      }
    }
    return sortedBByGoalsBalanceLaderboard;
  }
}
