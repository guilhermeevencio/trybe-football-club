import CreateMatchUseCase from './CreateMatchUseCase';
import CreateMatchController from './CreateMatchController';

const createMatchUseCase = new CreateMatchUseCase();

const createMatchController = new CreateMatchController(createMatchUseCase);

export default createMatchController;
