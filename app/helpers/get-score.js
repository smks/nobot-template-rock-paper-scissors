import { PLAYER, CPU } from './../constants/decisions';

export default function getScore() {
  const { localStorage } = window;
  const currentScorePlayer = parseInt(localStorage.getItem(PLAYER), 10) || 0;
  const currentScoreCPU = parseInt(localStorage.getItem(CPU), 10) || 0;

  return {
    player: currentScorePlayer,
    cpu: currentScoreCPU,
  };
}
