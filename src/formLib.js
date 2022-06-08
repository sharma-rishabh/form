const fs = require('fs');

const displayNextStatement = (form, isResponseValid) => {
  if (!isResponseValid) {
    form.currentQuestion().displayError();
    form.currentQuestion().displayStatement();
    return;
  }

  if (!form.anyQuestionsLeft()) {
    form.displayEndMessage();
    return;
  }

  form.nextQuestion().displayStatement();

}

const saveAnswer = (answer, form) => {
  if (form.currentQuestion().validator(answer)) {

    const parsedAnswer = form.currentQuestion().parser(answer, form.getResponse());
    form.updateResponse(form.currentQuestion().getType(), parsedAnswer);

    return true;
  }
  return false;
};

module.exports = { displayNextStatement, saveAnswer };
