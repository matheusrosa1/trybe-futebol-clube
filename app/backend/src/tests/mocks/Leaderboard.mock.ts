const teamsForLeaderboard = [
  {
    id: 1,
    teamName: 'Time 1',
  },
  {
    id: 2,
    teamName: 'Time 2',
  },
];

const leaderboards = [
  {
    name: 'Time 1',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 1,
  },
  {
    name: 'Time 2',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
  },
];

const matchesForLeaderboard = [
  {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 3,
    awayTeamGoals: 1,
  },
];

export {leaderboards,
   matchesForLeaderboard,
   teamsForLeaderboard}