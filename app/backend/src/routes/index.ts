import { Router } from 'express';
import LoginRoutes from './user.routes';
import TeamsRoutes from './teams.routes';
import MatchesRoutes from './matches.routes';
import LeaderboardRoutes from './leaderboard.routes';

const router = Router();

router.use(LoginRoutes);
router.use(TeamsRoutes);
router.use(MatchesRoutes);
router.use(LeaderboardRoutes);

export default router;
