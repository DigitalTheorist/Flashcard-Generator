
var inquirer = require('inquirer');
var fs = require('fs');
var MakeCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

var whichCard = process.argv[2]

var newBasic = new MakeCard();
var newCloze = new ClozeCard();

console.log("type basic for basic card creation");
console.log("type cloze for cloze card creation");
console.log("type flash to use the cards");

//
// if (whichCard === "MakeCard") {
//   new MakeCard
// }
