/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let result = "";
  let shortestLength = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < strs.length; i++) {
    if (strs[i].length < shortestLength) {
      shortestLength = strs[i].length;
    }
  }
  for (let i = 0; i < shortestLength; i++) {
    let currentLetter = strs[0][i];
    for (let j = 0; j < strs.length - 1; j++) {
      if (strs[j][i] !== strs[j + 1][i]) {
        return result;
      }
    }
    result += currentLetter;
  }
  return result;
};

let strs = ["flower", "flow", "flight"];
const result = longestCommonPrefix(strs);
console.log(result);
