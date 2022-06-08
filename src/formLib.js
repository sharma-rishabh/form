const saveAnswer = (answer, form, log, writer) => {
  try {
    form.updateResponse(answer);
  } catch (error) {
    log('invalid Response');
  }

  if (!form.anyQuestionsLeft()) {
    log('Thankyou');
    form.save(writer);
    return;
  }

  log(form.getPrompt());
};

module.exports = { saveAnswer };
