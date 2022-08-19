import { Router } from 'express';
import LoginRoutes from './user.routes';
import TeamsRoutes from './teams.routes';

const router = Router();

router.use(LoginRoutes);
router.use(TeamsRoutes);

export default router;
