/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length < 1) return "";

  let start = 0,
    end = 0;

  // Helper function to expand from center
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1; // length of the palindrome
  };

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i); // odd length
    let len2 = expandAroundCenter(i, i + 1); // even length
    let len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
};

const word = "racecar";
const result = longestPalindrome(word);
console.log(result);
