import { Router } from 'express';
import LoginRoutes from './user.routes';

const router = Router();

router.use(LoginRoutes);

export default router;
