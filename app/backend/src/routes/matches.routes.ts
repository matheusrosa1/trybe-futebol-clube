import { Request, Router, Response } from 'express';

import errorMiddleware from '../middlewares/errorMiddleware';
import MatchController from '../controllers/MatchController';
/* import Validations from '../middlewares/Validations';
 */
const matchController = new MatchController();

const router = Router();

/* router.get(
  '/_',
  errorMiddleware,
  (req: Request, res: Response) => matchController.getMatchesByQuery(req, res),
); */

router.get(
  '/',
  errorMiddleware,
  (req: Request, res: Response) => {
    if (req.query.inProgress) {
      matchController.getMatchesByQuery(req, res);
    } else {
      matchController.getAllMatches(req, res);
    }
  },
);

export default router;
