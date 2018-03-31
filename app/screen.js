import { LOADING, CHOICE, RESULT } from './constants/screens';
import { getConfig } from './loaders/config-loader';
import { createImagesForResult } from './choices';
import getScore from './helpers/get-score';

const screenElements = {};
const hideScreenClass = 'is-hidden';
const fadeInClass = 'fade-in';

const initScreens = () => {
  const game = document.getElementById('game');
  screenElements[LOADING] = game.querySelector('#loading-screen');
  screenElements[CHOICE] = game.querySelector('#choice-screen');
  screenElements[RESULT] = game.querySelector('#result-screen');

  const { screens } = getConfig();
  const { choice } = screens;
  const { title, subtitle } = choice;

  screenElements[CHOICE].querySelector('.title').textContent = title;
  screenElements[CHOICE].querySelector('.subtitle').textContent = subtitle;
};

const getScreen = (screen) => {
  const screenRef = screenElements[screen];
  if (screenRef !== undefined) {
    return screenRef;
  }
  throw new Error('Could not find screen', screen);
};

const changeToScreen = (screen) => {
  const screenRef = screenElements[screen];
  if (screenRef === undefined) {
    throw new Error('Cannot change to screen that does not exist');
  }
  screenRef.classList.add(fadeInClass);
  screenRef.classList.remove(hideScreenClass);
  Object.keys(screenElements).map((key) => {
    if (screen !== key) {
      const { classList } = screenElements[key];
      if (classList.contains(hideScreenClass) === false) {
        return classList.add(hideScreenClass);
      } else if (classList.contains(fadeInClass)) {
        return classList.remove(fadeInClass);
      }
      classList.add(hideScreenClass);
      return classList.remove(fadeInClass);
    }
    return false;
  });
};

const updateResultScreen = (playerChoice = {}, cpuChoice = {}, onRestart) => {
  createImagesForResult(playerChoice, cpuChoice);

  const results = getScreen(RESULT);

  const subtitle = results.querySelector('.subtitle');
  const score = results.querySelector('.score');
  const feedback = results.querySelector('.feedback');
  const replayButton = document.getElementById('replay-button');

  const playerDecision = playerChoice.getChoiceMade();
  const cpuDecision = cpuChoice.getChoiceMade();

  let subtitleText;
  let feedbackText;
  let isDraw = false;

  const { labels, screens } = getConfig();
  const { result } = screens;

  const playerLabel = labels[playerDecision];
  const cpuLabel = labels[cpuDecision];

  if (playerChoice.hasBeaten(cpuChoice)) {
    subtitleText = result.won;
    feedbackText = result.feedback.won;
  } else if (cpuChoice.hasBeaten(playerChoice)) {
    subtitleText = result.lost;
    feedbackText = result.feedback.lost;
  } else {
    isDraw = true;
    subtitleText = result.draw;
    feedbackText = result.feedback.draw;
  }

  if (!isDraw) {
    feedbackText = feedbackText
      .replace('{player}', `<strong>${playerLabel}</strong>`)
      .replace('{cpu}', `${cpuLabel}`);
  }

  const { player, cpu } = getScore();

  subtitle.textContent = subtitleText;
  score.textContent = `${player}-${cpu}`;
  feedback.innerHTML = feedbackText;

  replayButton.addEventListener('click', onRestart);
};

export { initScreens, getScreen, changeToScreen, updateResultScreen };
