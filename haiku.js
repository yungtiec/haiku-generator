var fs = require("fs");
var cmudictFile = readTextFile('./cmudict.txt');
var dict = formatData(cmudictFile);
console.log("Haiku generated from the dictionary given with a structure of [[5],[7],[5]]: \n" + createHaiku([[5],[7],[5]]))

function readTextFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){ 
  var lines = data.toString().split("\n");
  var dict = {};
  lines.forEach(function(line){    
    var lineSplit = line.split("  ");
    if (lineSplit[1] && /^[a-zA-Z]+$/.test(lineSplit[0])) {
      var phonemes = lineSplit[1].split(" ");
      var count = phonemes.reduce(function(acc, phoneme) {
        if (/\d/.test(phoneme)){
          acc++;
        }
        return acc;
      }, 0);
      if (!dict.hasOwnProperty(count)) {
        dict[count] = []; 
      } 
      dict[count].push(lineSplit[0]);
    }
  });   
  return dict;
}

function formatAddText(book) {
  var lines = book.toString().split("\n");
  var parsedWords = [];
  lines.forEach(function(line) {
    line.split(" ").forEach(function(word) {
      if (/^[a-zA-Z]+$/.test(word)) {
        parsedWords.push(word);
      }
    })
  })
  return parsedWords;
}

function createHaiku(structure, reference){
  var ref = (typeof reference === 'undefined') ? undefined : reference;
  var haiku = ""
  structure.forEach(function(lineStruc, index) {  
    lineStruc.forEach(function(syllables) {
      if (ref) {
        var words = dict[syllables].filter(function(word) {
          return (ref.indexOf(word) !== -1)
        })
      } else {
        var words = dict[syllables];
      }
      var choice = Math.floor(Math.random() * (words.length - 1) + 1);
      haiku += words[choice] + " ";
    })
    if (index !== structure.length - 1) {haiku += "\n"}
  })
  return haiku;
}

module.exports = {
  createHaiku: createHaiku,
  readTextFile: readTextFile,
  formatAddText: formatAddText,
};
