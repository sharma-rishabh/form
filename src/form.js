class Form {
  #index;
  constructor() {
    this.questions = [];
    this.index = 0;
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  currentQuestion() {
    return this.questions[this.#index];
  }

  nextQuestion() {
    this.#index++;
    this.currentQuestion()
  }
}

exports.Form = Form;