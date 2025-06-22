/*

The intuition for this kind of problem is to split the string given into k
segments. We can use a segment to split the string, padding the current array
with the filler variable if needed.

*/

/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
var divideString = function (s, k, fill) {
  const result = [];

  for (let i = 0; i < s.length; i += k) {
    let chunk = s.slice(i, i + k);
    if (chunk.length < k) {
      chunk = chunk + fill.repeat(k - chunk.length);
    }
    result.push(chunk);
  }

  return result;
};

const s = "abcdefg";
const k = 3;
const fill = "x";
console.log(divideString(s, k, fill));

/*

Run time is O(n)
Our result stores O(n) characters

*/
