import { Request, Router, Response } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  errorMiddleware,
  (req: Request, res: Response) =>
    leaderboardController.getAllLeaderboards(req, res),
);
router.get(
  '/home',
  errorMiddleware,
  (req: Request, res: Response) => leaderboardController.getLeaderboardforHomeTeams(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboardforAwayTeams(req, res),
);

export default router;
