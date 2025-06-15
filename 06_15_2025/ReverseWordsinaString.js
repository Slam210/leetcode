/*

The intuition behind this it to trim, split based of spaces, and reverse.
We then return the resulting arrow joined

*/

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  s = s.trim();

  const words = s.split(/\s+/);

  words.reverse();

  return words.join(" ");
};

console.log(reverseWords("the sky is blue"));

/*

Run time is O(n)
Space time is O(n)

*/
