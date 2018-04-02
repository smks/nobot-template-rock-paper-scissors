import { PLAYER, CPU } from './../constants/decisions';
import { getConfig } from './../loaders/config-loader';

export default function getScore() {
  const { localStorage } = window;
  const { projectName } = getConfig();
  const currentScorePlayer = parseInt(localStorage.getItem(`${projectName}_${PLAYER}`), 10) || 0;
  const currentScoreCPU = parseInt(localStorage.getItem(`${projectName}_${CPU}`), 10) || 0;

  return {
    player: currentScorePlayer,
    cpu: currentScoreCPU,
  };
}
