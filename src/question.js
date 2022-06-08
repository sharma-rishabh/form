class Question {
  #statement;
  #type;
  #parser;
  #validator;
  #error;
  #response;

  constructor(statement, type, parser = x => x, validator = _ => true, error) {
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

  getResponse() {
    return { type: this.#type, response: this.parseAnswer(this.#response) };
  }

  getStatement() {
    return this.#statement;
  }

  getError() {
    return this.#error;
  }

  parseAnswer(answer, context) {
    return this.#parser(answer, context);
  }

  validate(answer) {
    return this.#validator(answer);
  }
}

exports.Question = Question;
