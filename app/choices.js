import { CHOICE, RESULT } from './constants/screens';
import { getImageElements } from './loaders/image-loader';
import { getScreen } from './screen';
import getChoice from './helpers/get-choice';

let choices = {};
let onMadeChoice;

const onChoiceClick = (e) => {
  const { target } = e;
  const matches = target.matches || target.msMatchesSelector;

  if (matches.call(target, 'img')) {
    e.stopPropagation();
    const choiceTarget = e.target;
    const choice = getChoice(choiceTarget.dataset.choice);
    onMadeChoice(choice);
  }
};

const initChoices = (choiceMadeCallback) => {
  onMadeChoice = choiceMadeCallback;
  const choiceScreen = getScreen(CHOICE);
  const imageElements = getImageElements();

  choices = choiceScreen.querySelector('.choices');
  choices.appendChild(imageElements.rock);
  choices.appendChild(imageElements.paper);
  choices.appendChild(imageElements.scissors);

  choices.addEventListener('click', onChoiceClick);
};

const cleanUpChoiceScreen = () => {
  const imageElements = getImageElements();
  choices.removeEventListener('click', onChoiceClick);
  choices.removeChild(imageElements.rock);
  choices.removeChild(imageElements.paper);
  choices.removeChild(imageElements.scissors);
};

const createImagesForResult = (playerChoice = {}, cpuChoice = {}) => {
  const resultScreen = getScreen(RESULT);
  const imageElements = getImageElements();

  const playerDecision = playerChoice.getChoiceMade();
  const cpuDecision = cpuChoice.getChoiceMade();

  const choiceResults = resultScreen.querySelector('.choice-results');
  const playerChoiceImage = imageElements[playerDecision];
  let cpuChoiceImage;

  if (playerDecision === cpuDecision) {
    cpuChoiceImage = playerChoiceImage.cloneNode();
  } else {
    cpuChoiceImage = imageElements[cpuDecision];
  }

  playerChoiceImage.classList.add('left');
  cpuChoiceImage.classList.add('right');

  choiceResults.appendChild(playerChoiceImage);
  choiceResults.appendChild(cpuChoiceImage);
};

const cleanUpResultScreen = () => {
  const resultScreen = getScreen(RESULT);
  const choiceResults = resultScreen.querySelector('.choice-results');
  while (choiceResults.firstChild) {
    const image = choiceResults.firstChild;
    image.classList.remove('left');
    image.classList.remove('right');
    choiceResults.removeChild(image);
  }
};

const getChoiceElements = () => choices;

export {
  initChoices,
  getChoiceElements,
  cleanUpChoiceScreen,
  cleanUpResultScreen,
  createImagesForResult,
};
