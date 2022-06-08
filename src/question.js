class Question {
  #statement;
  #type;
  #parser;
  #validator;
  #error;
  #response;

  constructor(statement, type, error, validator = _ => true, parser = x => x) {
    this.#statement = statement;
    this.#type = type;
    this.#parser = parser;
    this.#validator = validator;
    this.#error = error;
    this.#response = null;
  }

  fillResponse(response) {
    this.#response = response;
  }

  equals(anotherQuestion) {
    return anotherQuestion instanceof Question &&
      this.#statement === anotherQuestion.#statement &&
      this.#error === anotherQuestion.#error &&
      this.#type === anotherQuestion.#type &&
      this.#validator === anotherQuestion.#validator &&
      this.#parser === anotherQuestion.#parser
  }

  getResponse() {
    return { type: this.#type, response: this.parseAnswer(this.#response) };
  }

  getStatement() {
    return this.#statement;
  }

  getError() {
    return this.#error;
  }

  parseAnswer(answer) {
    return this.#parser(answer);
  }

  validate(answer) {
    return this.#validator(answer);
  }
}

module.exports = { Question };
