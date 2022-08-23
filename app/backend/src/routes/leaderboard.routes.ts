import { Router } from 'express';

import leaderBoardController from '../modules/leaderboard/useCases';

const LeaderboardRoutes = Router();

LeaderboardRoutes.get(
  '/leaderboard/home',
  (req, res, next) => leaderBoardController.getAllHome(req, res, next),
);

LeaderboardRoutes.get(
  '/leaderboard/away',
  (req, res, next) => leaderBoardController.getAllAway(req, res, next),
);

export default LeaderboardRoutes;
