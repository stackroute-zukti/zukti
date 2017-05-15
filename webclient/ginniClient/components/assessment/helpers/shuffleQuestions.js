// const shuffleQuestions = array => {
//   return array
//     .map((item, index, array) => {
//       return array[Math.floor(Math.random() * array.length)];
//     })
//     .filter((item, index, array) => {
//       return index === array.indexOf(item);
//     })
//     .slice(0,10);
// };
Object.defineProperty(exports,"__esModule",{value:true});
var shuffleQuestions=function shuffleQuestions(array){
  var ques=array.default
  return ques.map(function(item,index,array){
    return array[Math.floor(Math.random() * ques.length)]
  }).filter(function(item,index,array){
    return index === array.indexOf(item);
  }).slice(0,5);
};
exports.default= shuffleQuestions;
