export default class Choice {
  constructor(choiceName, beats) {
    this.choiceName = choiceName;
    this.beats = beats;
  }

  getChoiceMade() {
    return this.choiceName;
  }

  hasBeaten(choice = {}) {
    return this.choiceName !== choice.beats && this.choiceName !== choice.choiceName;
  }
}
