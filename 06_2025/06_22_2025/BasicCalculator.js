/**
 *
 * To solve this, we simulate manual evaluation using a stack to maintain
 * intermediate results, a sign variable to handle addition/subtraction, a
 * pointer/index for parsing characters.We’ll traverse the string character
 * by character. Build numbers as we encounter digits When + or - is seen,
 * update the sign On (, recurse to evaluate the inner expression On ),
 * return from recursion Apply sign to number and update running total
 *
 */

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let i = 0;

  function helper() {
    let stack = [];
    let num = 0;
    let sign = 1;

    while (i < s.length) {
      const c = s[i];

      if (c === " ") {
        i++;
      } else if (isDigit(c)) {
        num = 0;
        while (i < s.length && isDigit(s[i])) {
          num = num * 10 + parseInt(s[i]);
          i++;
        }
        stack.push(sign * num);
      } else if (c === "+") {
        sign = 1;
        i++;
      } else if (c === "-") {
        sign = -1;
        i++;
      } else if (c === "(") {
        i++;
        stack.push(sign * helper());
      } else if (c === ")") {
        i++;
        break;
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  }

  function isDigit(c) {
    return c >= "0" && c <= "9";
  }

  return helper();
};

/**
 *
 * Run time is O(n)
 * Space time is O(n)
 */
