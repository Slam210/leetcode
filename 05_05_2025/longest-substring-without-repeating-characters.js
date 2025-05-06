/*

Use a sliding window technique to keep track of the longest substring,
reseting it when a duplicate has been detected in the existing set.

*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let charSet = new Set();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};

let s = "abcdefg";
const result = lengthOfLongestSubstring(s);
console.log(result);
