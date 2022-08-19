import { Router } from 'express';
import LoginRoutes from './user.routes';
import TeamsRoutes from './teams.routes';
import MatchesRoutes from './matches.routes';

const router = Router();

router.use(LoginRoutes);
router.use(TeamsRoutes);
router.use(MatchesRoutes);

export default router;
