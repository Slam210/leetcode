/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (word, numFriends) {
  if (numFriends > word.length) return "";
  if (numFriends === 1) return word;

  let maxPart = "";
  const maxLen = word.length - numFriends + 1;

  for (let i = 0; i < word.length; i++) {
    const str = word.substring(i, Math.min(i + maxLen, word.length));
    if (str > maxPart) {
      maxPart = str;
    }
  }

  return maxPart;
};

console.log(answerString("dcba", 2));
