const { Form } = require('./src/form.js');

const lib = require("./src/questions.js");
const { nameQuestion, DOBQuestion, hobbiesQuestion, phoneQuestion } = lib;

const createForm = () => {
  const form = new Form();
  form.addQuestion(nameQuestion());
  form.addQuestion(DOBQuestion());
  form.addQuestion(hobbiesQuestion());
  form.addQuestion(phoneQuestion());

  return form;
};

module.exports = { createForm };