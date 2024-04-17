import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import errorMiddleware from '../middlewares/errorMiddleware';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

/* router.get('/', (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res)); */

router.get(
  '/home',
  errorMiddleware,
  Validations.validateToken,
  (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res),
);

export default router;
