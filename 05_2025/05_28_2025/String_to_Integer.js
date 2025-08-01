/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  // Empty String
  if (s.length === 0) {
    return 0;
  }

  // Trim whitespaces
  s = s.trim();

  // Index, signage, total, and overflow bounds
  let i = 0;
  let sign = 1;
  let result = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // Check for sign
  if (s[i] === "-") {
    sign = -1;
    i++;
  } else if (s[i] === "+") {
    i++;
  }

  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i].charCodeAt(0) - "0".charCodeAt(0);
    result = result * 10 + digit;

    // Check overflow
    if (sign * result <= INT_MIN) return INT_MIN;
    if (sign * result >= INT_MAX) return INT_MAX;

    i++;
  }

  return sign * result;
};

const string = "-0411";
const result = myAtoi(string);
console.log(result);
