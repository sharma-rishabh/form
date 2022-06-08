const saveAnswer = (answer, form, log) => {
  try {
    form.updateResponse(answer);
  } catch (error) {
    log('invalid Response');
  }

  if (!form.anyQuestionsLeft()) {
    form.displayEndMessage();
    return;
  }

  log(form.getPrompt());
};

module.exports = { saveAnswer };
