/*

The intuition behind this code is that we can now min max two numbers.
Therefore, to get the largest difference, we can max once and then min once.
We find the first non 9 leading digit and convert it.
We then find the first non >0 leading digit and convert.
Find the difference and return that.

*/

function getMax(numStr) {
  for (let ch of numStr) {
    if (ch !== "9") {
      return numStr.replaceAll(ch, "9");
    }
  }
  return numStr;
}

function getMin(numStr) {
  if (numStr[0] !== "1") {
    return numStr.replaceAll(numStr[0], "1");
  }

  for (let i = 1; i < numStr.length; i++) {
    if (numStr[i] !== "0" && numStr[i] !== "1") {
      return numStr.replaceAll(numStr[i], "0");
    }
  }

  return numStr;
}

/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
  const str = num.toString();
  const maxNum = parseInt(getMax(str));
  const minNum = parseInt(getMin(str));
  return maxNum - minNum;
};

console.log(maxDiff(555));

/*

Run time is O(n) since we traverse the string 2 times at most
Space time is O(n) since we store a string copy

*/
