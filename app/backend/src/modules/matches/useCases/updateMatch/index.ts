import UpdateMatchUseCase from './UpdateMatchUseCase';
import UpdateMatchController from './UpdateMatchController';

const updateMatchUseCase = new UpdateMatchUseCase();
const updateMatchController = new UpdateMatchController(updateMatchUseCase);

export default updateMatchController;
