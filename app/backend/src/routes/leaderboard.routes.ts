import { Router } from 'express';

import leaderBoardController from '../modules/leaderboard/useCases';

const LeaderboardRoutes = Router();

LeaderboardRoutes.get(
  '/leaderboard/home',
  (req, res, next) => leaderBoardController.getAll(req, res, next),
);

export default LeaderboardRoutes;
