const saveAnswer = (answer, form) => {
  try {
    form.updateResponse(answer);
  } catch (error) {
    console.log('invalid Response');
  }

  if (!form.anyQuestionsLeft()) {
    form.displayEndMessage();
    return;
  }

  console.log(form.getPrompt());
};

module.exports = { displayNextStatement, saveAnswer };
