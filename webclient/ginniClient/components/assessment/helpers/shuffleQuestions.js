
//To ShuffletheQuestion based on mathrandom
Object.defineProperty(exports,"__esModule",{value:true});
var shuffleQuestions=function shuffleQuestions(array){
  var ques=array
  return ques.map(function(item,index,array){
    return array[Math.floor(Math.random() * ques.length)]
  }).filter(function(item,index,array){
    return index === array.indexOf(item);
  }).slice(0,5);
};
exports.default= shuffleQuestions;
