import { PLAYER, CPU } from './../constants/decisions';
import { getConfig } from './../loaders/config-loader';

export default function saveScore(whoWon) {
  const { localStorage } = window;
  const { projectName } = getConfig();

  const playerKey = `${projectName}_${PLAYER}`;
  const cpuKey = `${projectName}_${CPU}`;

  const currentScorePlayer = parseInt(localStorage.getItem(playerKey), 10) || 0;
  const currentScoreCPU = parseInt(localStorage.getItem(cpuKey), 10) || 0;

  if (whoWon === PLAYER) {
    localStorage.setItem(playerKey, currentScorePlayer + 1);
  } else if (whoWon === CPU) {
    localStorage.setItem(cpuKey, currentScoreCPU + 1);
  }
}
