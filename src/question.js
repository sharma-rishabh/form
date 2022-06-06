class Question {
  constructor(statement, type, parser, validator) {
    this.statement = statement;
    this.type = type;
    this.parser = parser;
    this.validator = validator;
  }

  getStatement() {
    return this.statement;
  }

  getType() {
    return this.type;
  }

  parseAnswer(answer, context) {
    return this.parser(answer, context);
  }

  validate(answer) {
    return this.validator(answer);
  }
}

exports.Question = Question;