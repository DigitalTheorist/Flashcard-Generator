
var inquirer = require('inquirer');

  var MakeCard = function (front, back) {

    this.front = front
    this.back = back
  }


module.exports = MakeCard;






// inquirer.prompt ([
//   {
//   name: 'cardOne',
//   message: "what is the color of the sky?",
//   validate: function (answer) {
//     if (answer !== "blue") {
//       console.log("\nnot correct!")
//         } else {
//           console.log("\ncorrect!")
//         }
//       }
//   },
//   {
//     name: 'cardTwo',
//     message: "Is water wet?",
//     validate: function (answer) {
//       if (answer !== "yes") {
//         console.log("\nThats right!")
//         } else {
//           console.log("\nWrong!")
//         }
//     }
//   }
//
// ])


// var animalCard = new MakeCard ("hog", "mudskipper");
// console.log("this is animalCard " + animalCard);


// prints information to console
// animalCard.printInfo();

//scope safe constructors
