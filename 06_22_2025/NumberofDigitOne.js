/**
 *
 * To count how many times the digit 1 appears from 1 to n,
 * we analyze each digit position instead of checking every number.
 * For each position, we break n into three parts: the digits before,
 * the current digit, and the digits after. Based on the value of curr,
 * we apply a formula to compute how many times 1 appears in that position.
 * if curr is 0, the count is high * digit; if curr is 1, it's high * digit + low + 1;
 * otherwise, it's (high + 1) * digit. We repeat this for every digit position and sum the results for the total count.
 *
 */

/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {
  let count = 0;
  let digit = 1;

  while (Math.floor(n / digit) > 0) {
    let high = Math.floor(n / (digit * 10));
    let curr = Math.floor(n / digit) % 10;
    let low = n % digit;

    if (curr === 0) {
      count += high * digit;
    } else if (curr === 1) {
      count += high * digit + (low + 1);
    } else {
      count += (high + 1) * digit;
    }

    digit *= 10;
  }

  return count;
};

/**
 *
 * Time complexity is log(n)
 * Space complexity is O(1)
 *
 */
