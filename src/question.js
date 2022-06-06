class Question {
  constructor(statement, type, parser, validator, error) {
    this.statement = statement;
    this.type = type;
    this.parser = parser;
    this.validator = validator;
    this.error = error
  }

  getStatement() {
    return this.statement;
  }

  getType() {
    return this.type;
  }

  getError() {
    return this.error;
  }

  parseAnswer(answer, context) {
    return this.parser(answer, context);
  }

  validate(answer) {
    return this.validator(answer);
  }
}

exports.Question = Question;