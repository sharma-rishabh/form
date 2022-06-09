class Form {
  #index;
  #questions;
  constructor() {
    this.#questions = [];
    this.#index = 0;
  }

  equals(anotherForm) {
    if (!anotherForm instanceof Form) {
      return false;
    }

    return anotherForm.#questions.every((question, index) => {
      return question.equals(this.#questions[index]);
    });
  }

  addQuestion(question) {
    this.#questions.push(question);
  }

  currentQuestion() {
    return this.#questions[this.#index];
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

    this.#questions.forEach((question) => {
      const { type, response } = question.getResponse();
      answer[type] = response;
    });

    return answer;
  }

  getPrompt() {
    return this.currentQuestion().getStatement();
  }

  #responseToJSON() {
    return JSON.stringify(this.getResponse());
  }

  anyQuestionsLeft() {
    return this.#index < this.#questions.length;
  }

  save(writer) {
    writer('./answers.json', this.#responseToJSON(), 'utf8');
    process.stdin.destroy();
  }
}

exports.Form = Form;
