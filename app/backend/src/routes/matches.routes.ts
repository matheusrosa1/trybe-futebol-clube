import { Request, Router, Response } from 'express';

import errorMiddleware from '../middlewares/errorMiddleware';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

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

router.patch(
  '/:id/finish',
  errorMiddleware,
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishingMatch(req, res),
);

router.patch(
  '/:id',
  errorMiddleware,
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  errorMiddleware,
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
