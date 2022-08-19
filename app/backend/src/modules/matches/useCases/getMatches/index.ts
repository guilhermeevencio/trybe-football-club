import GetMatchesController from './GetMatchesController';
import GetMatchesUseCase from './GetMatchesUseCase';

const getMatchesUseCase = new GetMatchesUseCase();
const getMatchesController = new GetMatchesController(getMatchesUseCase);

export default getMatchesController;
