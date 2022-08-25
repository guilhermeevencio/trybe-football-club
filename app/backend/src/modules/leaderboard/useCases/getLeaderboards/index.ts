import LeaderboarUseCase from './LeaderboardUseCase';
import LeaderboardController from './LeaderBoardController';

const leaderboardUseCase = new LeaderboarUseCase();

const leaderBoardController = new LeaderboardController(leaderboardUseCase);

export default leaderBoardController;
