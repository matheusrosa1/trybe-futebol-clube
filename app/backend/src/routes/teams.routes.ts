import { Request, Router, Response } from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get(
  '/',
  errorMiddleware,
  (req: Request, res: Response) => teamController.getAllTeams(req, res),
);

router.get(
  '/:id',
  errorMiddleware,
  (req: Request, res: Response) => teamController.getTeamById(req, res),
);

export default router;
