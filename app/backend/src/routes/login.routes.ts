import { Request, Router, Response } from 'express';

import errorMiddleware from '../middlewares/errorMiddleware';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  errorMiddleware,
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  errorMiddleware,
  Validations.validateToken,
  (req: Request, res: Response) => userController.gettingRole(req, res),
);

export default router;
