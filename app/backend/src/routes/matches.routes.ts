import { Router } from 'express';
import getMatchesController from '../modules/matches/useCases/getMatches';
import createMatchController from '../modules/matches/useCases/createMatch';
import ValidateToken from '../middlewares/ValidateToken';

const MatchesRoutes = Router();

MatchesRoutes.get(
  '/matches',
  (req, res, next) => getMatchesController.getAll(req, res, next),
);

MatchesRoutes.post(
  '/matches',
  ValidateToken,
  (req, res, next) => createMatchController.createMatch(req, res, next),
);

export default MatchesRoutes;
