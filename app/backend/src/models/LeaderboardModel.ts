import ILeaderboard from '../Interfaces/leaderboars/ILeaderboard';
import ITeam from '../Interfaces/teams/ITeam';
import IMatch from '../Interfaces/matches/IMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import ILeaderboardModel from '../Interfaces/leaderboars/ILeaderboardModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

type matchType = 'finalized' | 'home' | 'away';

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

  async getSortedLeaderboard(matchType: matchType): Promise<ILeaderboard[]> {
    const leaderboard = await this.getLeaderboard(matchType);
    return leaderboard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  }
}
