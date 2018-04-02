import loadStyles from './loaders/styles-loader';
import { loadImages } from './loaders/image-loader';
import { initScreens, changeToScreen, updateResultScreen } from './screen';
import { CHOICE, RESULT } from './constants/screens';
import { initChoices, cleanUpChoiceScreen, cleanUpResultScreen } from './choices';
import getChoice from './helpers/get-choice';
import randomChoice from './helpers/random-choice';
import saveScore from './actions/save-score';
import { PLAYER, CPU, DRAW } from './constants/decisions';
import loadConfig, { getConfig } from './loaders/config-loader';

const init = () => {
  const game = document.getElementById('game');
  const config = getConfig();
  game.style.backgroundImage = `url(${config.theme.path}/${config.images.background})`;
  game.style.fontFamily = config.theme.fontFamily;
};

const onRestart = () => {
  cleanUpResultScreen();
  initChoices(onMadeChoice);
  changeToScreen(CHOICE);
};

const onMadeChoice = (playerChoice) => {
  cleanUpChoiceScreen();

  const cpuChoice = getChoice(randomChoice());

  let winner;

  if (playerChoice.hasBeaten(cpuChoice)) {
    winner = PLAYER;
  } else if (cpuChoice.hasBeaten(playerChoice)) {
    winner = CPU;
  } else {
    winner = DRAW;
  }

  saveScore(winner);
  updateResultScreen(playerChoice, cpuChoice, onRestart);
  changeToScreen(RESULT);
};

const bootstrap = () => {
  init();
  initScreens();
  initChoices(onMadeChoice);
  changeToScreen(CHOICE);
};

const initGame = () => {
  loadConfig()
    .then(() => {
      loadStyles();
      return loadImages();
    })
    .then(bootstrap);
};

export default initGame;
