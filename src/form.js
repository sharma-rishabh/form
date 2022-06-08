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

  updateResponse(data) {
    const currentQuestion = this.currentQuestion();
    if (!currentQuestion.validate(data)) {
      throw new Error(currentQuestion.getError());
    }
    currentQuestion.fillResponse(data);
    this.#index++;
  }

  getResponse() {
    const answer = {};

    this.questions.forEach((question) => {
      const { type, response } = question.getResponse();
      answer[type] = response;
    });

    return answer;
  }

  getPrompt() {
    return this.currentQuestion().getStatement();
  }

  responseToJSON() {
    return JSON.stringify(this.getResponse());
  }

  anyQuestionsLeft() {
    return this.#index < this.questions.length;
  }

  displayEndMessage() {
    console.log('Thankyou!! press (control + d) to save your response.');
  }
}

exports.Form = Form;
