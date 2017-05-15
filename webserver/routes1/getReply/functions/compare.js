module.exports = function(userQuery, title)
{
  let wordCount = 0;
  for (let u = 0; u < userQuery.length; u = u + 1) {
      for (let t = 0; t < title.length; t = t + 1) {
          if (userQuery[u] === title[t]) {
              wordCount = wordCount + 1;
          }
      }
  }
  return wordCount;
};
