/**
 * @param {string} s
 * @return {number}
 */
var maxDifference = function (s) {
  const freq = {};
  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }

  const oddFreqs = [];
  const evenFreqs = [];

  for (let count of Object.values(freq)) {
    if (count % 2 === 1) {
      oddFreqs.push(count);
    } else {
      evenFreqs.push(count);
    }
  }

  const maxOdd = Math.max(...oddFreqs);
  const minEven = Math.min(...evenFreqs);

  return maxOdd - minEven;
};

console.log(maxDifference("aaaaabbc"));
