
var inquirer = require('inquirer');
var fs = require('fs');

var MakeCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

startProgram();

//USER INSTRUCTIONS
//------------------------------------------------------------------
//------------------------------------------------------------------

function startProgram(){
  inquirer.prompt ([
    {
      type: "checkbox",
      name: "typeOfCard",
      message: "What would you like to do?",
      choices: [
        "Create a Basic Card.",
        "Create a Cloze Card.",
        "Run the flashcards!",
        "I'm finished for now."
      ]
    }
  ]).then(function(answers){
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
  ''});
};
//------------------------------------------------------------------

//BASIC CARD FUNCTION
//------------------------------------------------------------------
function createBasicCards () {
inquirer.prompt ([
   {
     name: "front",
     message: "What should the flashcard ask?"
   },
   {
     name: "back",
     message: "What should the answer be?"
   }
    ]).then(function(answers){

      var basicCard = new MakeCard (answers.front, answers.back)

      var logBasicCardQuestion = answers.front;
      var logBasicCardAnswer = answers.back;

      console.log("Your Card has been created and added to the list.")

      fs.appendFileSync("questions.txt",'\n' + logBasicCardQuestion, encoding = 'utf8');
      fs.appendFileSync("answers.txt",'\n' + logBasicCardAnswer, encoding = 'utf8');

      startProgram();
    });
};
//------------------------------------------------------------------

//CLOZE CARD FUNCTION
//------------------------------------------------------------------
function createClozeCards () {
inquirer.prompt ([
   {
     name: "front",
     message: "Write the full text of the Clozecard question."
   },
   {
     name: "cloze",
     message: "What information should be removed?"
   },
    ]).then(function(answers){

      var str = answers.front;
      answers.front = str.replace(answers.cloze, "...");

      var clozeCard = new ClozeCard (answers.front, answers.cloze)

      var logClozeCardQuestion = answers.front;
      var logClozeCardAnswer = answers.cloze;

      console.log("Your Card has been created and added to the list.")

      fs.appendFileSync("questions.txt",'\n' + logClozeCardQuestion, encoding = 'utf8');
      fs.appendFileSync("answers.txt", '\n' + logClozeCardAnswer, encoding = 'utf8');

      startProgram();
    });
};
//------------------------------------------------------------------

//VARIABLES FOR FLASHCARD FUNCTION (IN GLOBAL SCOPE)
var questionIndex = 1
var answerIndex = 1
var flashAnswers
var flashQuestions

//RUN FLASHCARDS FUNCTION
//------------------------------------------------------------------

function flashCards () {

  fs.readFile("answers.txt", "utf8", function(error, data){
    if (error) {
      return console.log(error);
    }
    flashAnswers = data.split('\n');
    flashAnswers1 = data
    // console.log(flashAnswers);
    // console.log(flashAnswers1);
  });

  fs.readFile("questions.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
      }

      flashQuestions = data.split('\n');

          inquirer.prompt([
            {
              name: "qSide",
              type: 'input',
              message: flashQuestions[questionIndex]
            }
          ]).then(function(answers) {
            if (questionIndex === (flashQuestions.length - 1)) {
              console.log("There are no more flashcards!");
              questionIndex = 1
              answerIndex = 1
              startProgram();
              } else if (answers.qSide === flashAnswers[answerIndex]) {
                console.log("Correct!!!");
                answerIndex++
                questionIndex++
                flashCards();
                  } else if (answers.qSide !== flashAnswers[answerIndex]) {
                      console.log("Your're Incorrect :(");
                      answerIndex++
                      questionIndex++
                      flashCards();
                    }
            });
  });
};
