import GetTeamsController from './GetTeamsController';
import GetTeamsUseCase from './GetTeamsUseCase';

const getTeamsUseCase = new GetTeamsUseCase();
const getTeamsController = new GetTeamsController(getTeamsUseCase);

export default getTeamsController;
