
var inquirer = require('inquirer');
var fs = require('fs');
var readline = require('linebyline');
var MakeCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

var whichCard = process.argv[2]

startProgram();
//USER INSTRUCTIONS
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

      var logBasicCard =
      "Front of card: " + answers.front +
      "\nBack of card: " + answers.back;
        console.log("Your Card has been created and added to the list.")
      fs.appendFileSync("cards.txt","\n \n" + logBasicCard, encoding = 'utf8');
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
     message: "What should the ClozeCard ask?"
   },
   {
     name: "cloze",
     message: "What information should be removed?"
   },
    ]).then(function(answers){

      //Manipulates user input string to replace text with ...
      var str = answers.front;
      answers.front = str.replace(answers.cloze, "...");

      var clozeCard = new ClozeCard (answers.front, answers.cloze)

      var logClozeCard =
      "Front of card: " + answers.front +
      "\nBack of card: " + answers.cloze;

      fs.appendFileSync("cards.txt","\n \n" + logClozeCard, encoding = 'utf8');
      startProgram();
    });
};
//------------------------------------------------------------------

//RUN FLASHCARDS FUNCTION
//------------------------------------------------------------------
function flashCards (){
  console.log("this is the flashcard function")


    rl = readline('./cards.txt');
    rl.on('line', function(line, lineCount, byteCount) {
      console.log(byteCount);
    })
    .on('error', function(e) {
      // something went wrong
    });

  // fs.readFile('cards.txt', 'utf8', function(err, data){
  //   if (err) throw err;
  //   console.log(data);
  // })

};
