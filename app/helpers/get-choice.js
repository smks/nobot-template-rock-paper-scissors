import Choice from './../classes/choice';
import { ROCK, PAPER, SCISSORS } from './../constants/choices';

export default function getChoice(choice) {
  switch (choice) {
    case ROCK:
      return new Choice(ROCK, SCISSORS);
    case PAPER:
      return new Choice(PAPER, ROCK);
    case SCISSORS:
      return new Choice(SCISSORS, PAPER);
    default:
      throw new Error('Choice not found', choice);
  }
}
