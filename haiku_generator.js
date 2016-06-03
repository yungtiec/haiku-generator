var haiku = require('./haiku');
var darwinText = haiku.readTextFile('./darwin.txt'); // specify text
var darwinWords = haiku.formatAddText(darwinText);
var structure = [[1,2,2],[3,4],[3,2]]; // specify structure
console.log("Haiku generated from Darwin's On the origin of species with a struction of [[1,2,2],[3,4],[5]]: \n" + haiku.createHaiku(structure, darwinWords))