import LeaderboarUseCase from './leaderboardUseCase';
import LeaderboardController from './leaderBoardController';

const leaderboardUseCase = new LeaderboarUseCase();

const leaderBoardController = new LeaderboardController(leaderboardUseCase);

export default leaderBoardController;
