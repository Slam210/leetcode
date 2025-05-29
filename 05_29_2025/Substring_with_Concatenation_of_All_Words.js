/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  if (!s || !words || words.length === 0) return [];

  const wordLength = words[0].length;
  const totalLength = wordLength * words.length;
  const wordCount = new Map();

  // Count the frequency of each word
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }

  const result = [];

  // We try each offset from 0 to wordLength - 1
  for (let i = 0; i < wordLength; i++) {
    let left = i;
    let right = i;
    let seen = new Map();
    let count = 0;

    while (right + wordLength <= s.length) {
      const word = s.substring(right, right + wordLength);
      right += wordLength;

      if (wordCount.has(word)) {
        seen.set(word, (seen.get(word) || 0) + 1);
        count++;

        // If we have too many of the same word, move left
        while (seen.get(word) > wordCount.get(word)) {
          const leftWord = s.substring(left, left + wordLength);
          seen.set(leftWord, seen.get(leftWord) - 1);
          count--;
          left += wordLength;
        }

        if (count === words.length) {
          result.push(left);
        }
      } else {
        // Reset if the word isn't in the list
        seen.clear();
        count = 0;
        left = right;
      }
    }
  }

  return result;
};

const s = "goodwordgoodbestwordgoodgoodbestword";
const words = ["word", "good", "best", "word"];
console.log(findSubstring(s, words));
