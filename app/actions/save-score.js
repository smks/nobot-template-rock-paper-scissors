import { PLAYER, CPU } from './../constants/decisions';

export default function saveScore(whoWon) {
  const { localStorage } = window;
  const currentScorePlayer = parseInt(localStorage.getItem(PLAYER), 10) || 0;
  const currentScoreCPU = parseInt(localStorage.getItem(CPU), 10) || 0;

  if (whoWon === PLAYER) {
    localStorage.setItem(PLAYER, currentScorePlayer + 1);
  } else if (whoWon === CPU) {
    localStorage.setItem(CPU, currentScoreCPU + 1);
  }
}
