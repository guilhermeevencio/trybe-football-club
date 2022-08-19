import { Router } from 'express';
import getMatchesController from '../modules/matches/useCases/getMatches';

const MatchesRoutes = Router();

MatchesRoutes.get('/matches', (req, res, next) => getMatchesController.getAll(req, res, next));

export default MatchesRoutes;
