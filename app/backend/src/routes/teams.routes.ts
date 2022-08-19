import { Router } from 'express';
import getTeamsController from '../modules/teams/useCases/getTeams';

const TeamsRoutes = Router();

TeamsRoutes.get('/teams', (req, res, next) => getTeamsController.getAll(req, res, next));

TeamsRoutes.get('/teams/:id', (req, res, next) => getTeamsController.getAll(req, res, next));

export default TeamsRoutes;
