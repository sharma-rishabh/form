const assert = require('assert');
const { Form } = require('../src/form.js');
const { Question } = require('../src/question.js');
const { nameQuestion, phoneQuestion } = require('../src/questions.js');

const identity = x => x;
const alwaysTrue = _ => true;

describe('Form', () => {

  describe('equal', () => {
    it('Should check if two forms are equal', () => {
      const form1 = new Form();
      const form2 = new Form();

      form1.addQuestion(nameQuestion());
      form2.addQuestion(phoneQuestion());


      assert.ok(form1.equals(form1));
      assert.strictEqual(form1.equals(form2), false);
    });
  });

  describe('gets', () => {
    it('should get the prompt for the current question.', () => {
      const form = new Form();
      const question = new Question('a', 'b', 'c');
      form.addQuestion(question);

      assert.strictEqual(form.getPrompt(), 'a');
    });

    it('should get all the responses added by the user', () => {
      const form = new Form();
      const question = new Question('a', 'b', 'c');

      form.addQuestion(question);
      form.updateResponse('response')

      assert.deepStrictEqual(form.getResponse(), { b: 'response' });
    });

    it('should get the current question.', () => {
      const form = new Form();
      const question1 = new Question('a', 'b', 'c', alwaysTrue, identity);
      const question2 = new Question('d', 'e', 'f', alwaysTrue, identity);

      form.addQuestion(question1);
      form.addQuestion(question2);
      form.updateResponse('response')

      assert.ok(form.currentQuestion().equals(question2));
    });
  });

  describe('anyQuestionsLeft', () => {
    it('Should tell if any questions are left.', () => {
      const form = new Form();
      assert.strictEqual(form.anyQuestionsLeft(), false);
    });

    it('Should tell if any questions are not left.', () => {
      const form = new Form();
      const question1 = new Question('a', 'b', 'c', alwaysTrue, identity);
      form.addQuestion(question1);
      assert.strictEqual(form.anyQuestionsLeft(), true);
    });
  });

  describe('save', () => {
    it('Should save the given responses when called.', () => {
      const form = new Form();
      const question1 = new Question('a', 'b', 'c', alwaysTrue, identity);

      const mockWFS = (expectedFileName, expectedContent) => {
        return (fileName, content, encoding) => {
          assert.strictEqual(fileName, expectedFileName);
          assert.strictEqual(content, expectedContent);
          assert.strictEqual(encoding, 'utf8');
        }
      }

      const mockedWFS = mockWFS('./answers.json', '{"b":"response"}');

      form.addQuestion(question1);
      form.updateResponse('response')

      assert.strictEqual(form.save(mockedWFS), undefined);
    });
  });

});
