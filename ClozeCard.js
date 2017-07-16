
var fs = require('fs');

var ClozeCard = function (fullText, partial, cloze) {

  this.fullText = fullText
  this.partial = partial
  this.cloze = cloze

};


module.exports = ClozeCard;
