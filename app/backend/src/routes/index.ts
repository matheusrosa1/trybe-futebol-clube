import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';
import matchesRouter from './matches.routes';
import leaderboards from './leaderboards.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboards', leaderboards);
export default router;
