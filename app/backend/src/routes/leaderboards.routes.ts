import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

/* router.get('/', (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res)); */

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res),
);

export default router;
