import { ROCK, PAPER, SCISSORS } from './../constants/choices';

export default function randomChoice() {
  const random = Math.random();
  if (random <= 0.33) {
    return ROCK;
  } else if (random <= 0.66) {
    return PAPER;
  }
  return SCISSORS;
}
