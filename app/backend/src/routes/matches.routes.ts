import { Request, Router, Response } from 'express';

import errorMiddleware from '../middlewares/errorMiddleware';
import MatchController from '../controllers/MatchController';
/* import Validations from '../middlewares/Validations';
 */
const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  errorMiddleware,
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.get(
  '/',
  errorMiddleware,
  (req: Request, res: Response) => matchController.getMatchesByQuery(req, res),
);

export default router;
