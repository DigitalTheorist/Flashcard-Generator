var inquirer = require('inquirer');
var fs = require('fs');

var MakeCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

startProgram();

// PROMPT FOR USER INSTRUCTIONS
//------------------------------------------------------------------
//------------------------------------------------------------------

function startProgram() {
  inquirer.prompt([
    {
      type: "checkbox",
      name: "typeOfCard",
      message: "What would you like to do?",
      choices: ["Create a Basic Card.", "Create a Cloze Card.", "Run the flashcards!", "I'm finished for now."]
    }
  ]).then(function(answers) {
    if (answers.typeOfCard[0] === 'Create a Basic Card.') {
      console.log("Create your Basic Card accordingly.")
      createBasicCards();
    } else if (answers.typeOfCard[0] === 'Create a Cloze Card.') {
      console.log("Create your Cloze Card accordingly.")
      createClozeCards();
    } else if (answers.typeOfCard[0] === 'Run the flashcards!') {
      flashCards();
    } else {
      return
    }
    ''
  });
};
//------------------------------------------------------------------

// USER ADD A BASIC CARD FUNCTION
//------------------------------------------------------------------
function createBasicCards() {
  inquirer.prompt([
    {
      name: "front",
      message: "What should the flashcard ask?"
    }, {
      name: "back",
      message: "What should the answer be?"
    }
  ]).then(function(answers) {

    var basicCard = new MakeCard(answers.front, answers.back);

    var logBasicCardQuestion = answers.front;
    var logBasicCardAnswer = answers.back;

    console.log("Your Card has been created and added to the list.")

    fs.appendFileSync("questions.txt", logBasicCardQuestion + '\n');
    fs.appendFileSync("answers.txt", logBasicCardAnswer + '\n');

    startProgram();
  });
};
//------------------------------------------------------------------

// USER ADD A CLOZE CARD FUNCTION
//------------------------------------------------------------------
function createClozeCards() {
  inquirer.prompt([
    {
      name: "front",
      message: "Write the full text of the Clozecard question."
    }, {
      name: "cloze",
      message: "What information should be removed?"
    }
  ]).then(function(answers) {

    var str = answers.front;
    answers.front = str.replace(answers.cloze, "...");

    var clozeCard = new ClozeCard(answers.front, answers.cloze);

    var logClozeCardQuestion = answers.front;
    var logClozeCardAnswer = answers.cloze;

    console.log("Your Card has been created and added to the list.")

    fs.appendFileSync("questions.txt", logClozeCardQuestion +'\n');
    fs.appendFileSync("answers.txt", logClozeCardAnswer + '\n');

    startProgram();
  });
};
//------------------------------------------------------------------

// ASSIGN VARIABLES FOR FLASHCARD FUNCTION (IN GLOBAL SCOPE)
var questionIndex = 0
var answerIndex = 0
var flashAnswers
var flashQuestions

// RUN FLASHCARDS FUNCTION (recursive)
//------------------------------------------------------------------

function flashCards() {

  //READFILE FOR ANSWERS.TXT - ASSIGN VAR flashAnswers

  fs.readFile("answers.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    flashAnswers = data.split('\n');
  });

  // READFILE FOR QUESTIONS.TXT  - ASSIGN VAR flashQuestions

  fs.readFile("questions.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    flashQuestions = data.split('\n');

    // INQUIRER TO RUN FLASHCARD QUIZ

    inquirer.prompt([
      {
        name: "qSide",
        type: 'input',
        message: flashQuestions[questionIndex]
      }
    ]).then(function(answers) {
      if (questionIndex === (flashQuestions.length - 2)) { // Check to see if length of questions not exceeded. This is the recursive function terminator.
        console.log("There are no more flashcards!");
        questionIndex = 0 // Reset questionIndex
        answerIndex = 0 // Reset answerIndex
        startProgram(); // Call startProgram

      } else if (answers.qSide === flashAnswers[answerIndex]) { // If not exceeded run Correct answer function
          console.log("Correct!!!");
          answerIndex++ // Increment answerIndex
          questionIndex++ // Increment questionIndex
          flashCards(); // Call flashCards

      } else if (answers.qSide !== flashAnswers[answerIndex]) { // if Incorrect answer, run incorrect answer function
            console.log("Your're Incorrect :(");
            answerIndex++ // Increment answerIndex
            questionIndex++ // Increment questionIndex
            flashCards(); // Call flashCards
      }

    });
  });
};


// test zone
