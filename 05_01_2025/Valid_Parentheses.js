/*

Utilization of a stack in order to manage last  in first out property of the problem

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const c of s) {
    if (Object.values(map).includes(c)) {
      stack.push(c);
    } else if (map.hasOwnProperty(c)) {
      if (!stack.length || map[c] !== stack.pop()) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

const s = "([)]";
let result = isValid(s);
console.log(result);
