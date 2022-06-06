class Form {
  #index;
  constructor() {
    this.questions = [];
    this.#index = 0;
    this.response = {};
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  currentQuestion() {
    return this.questions[this.#index];
  }

  nextQuestion() {
    this.#index++;
    return this.currentQuestion()
  }

  updateResponse(type, data) {
    this.response[type] = data;
  }

  getResponse() {
    return this.response;
  }

  responseToJSON() {
    return JSON.stringify(this.response);
  }

  anyQuestionsLeft() {
    return this.#index < this.questions.length - 1;
  }

  displayEndMessage() {
    if (this.#index === this.questions.length - 1) {
      console.log('Thankyou!! press (control + d) to save your response.');
    }
    return;
  }
}

exports.Form = Form;
