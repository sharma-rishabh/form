const assert = require('assert');
const { Question } = require('../src/question');

const identity = x => x;
const alwaysTrue = _ => true;

describe('Equal', () => {
  it('Should check if two questions are equal', () => {
    const question1 = new Question('a', 'b', 'e', alwaysTrue, identity);
    const question2 = new Question('a', 'd', 'c', alwaysTrue, identity);
    assert.ok(question1.equals(question1));
    assert.strictEqual(question1.equals(question2), false);
  });
});

describe('getResponse', () => {
  it('Should return null if no response is added.', () => {
    const question = new Question('a', 'b', 'e', alwaysTrue, identity);
    assert.deepStrictEqual(question.getResponse(),
      { response: null, type: 'b' }
    );
  });

  it('Should return the added response.', () => {
    const question = new Question('a', 'b', 'e', alwaysTrue, identity);
    question.fillResponse('hello')
    assert.deepStrictEqual(question.getResponse(),
      { response: 'hello', type: 'b' });
  });
});

describe('gets', () => {
  it('should get statement if getStatement is called', () => {
    const question = new Question('a', 'b', 'e', alwaysTrue, identity);
    assert.strictEqual(question.getStatement(), 'a');
  });

  it('should get statement if getStatement is called', () => {
    const question = new Question('a', 'b', 'e', alwaysTrue, identity);
    assert.strictEqual(question.getError(), 'e');
  });
});

describe('parserAndValidator', () => {
  const question = new Question('a', 'b', 'e', alwaysTrue, identity);
  it('should call given parser.', () => {
    assert.strictEqual(question.parseAnswer('hello'), 'hello');
  });

  it('should call given validator.', () => {
    assert.strictEqual(question.validate('hello'), true);
  });
});