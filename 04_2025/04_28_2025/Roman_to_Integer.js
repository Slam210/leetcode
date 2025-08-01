/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I" && (s[i + 1] === "V" || s[i + 1] === "X")) {
      total += map[s[i + 1]] - 1;
      i++;
    } else if (s[i] === "X" && (s[i + 1] === "L" || s[i + 1] === "C")) {
      total += map[s[i + 1]] - 10;
      i++;
    } else if (s[i] === "C" && (s[i + 1] === "D" || s[i + 1] === "M")) {
      total += map[s[i + 1]] - 100;
      i++;
    } else {
      total += map[s[i]];
    }
  }

  return total;
};

let s = "MCMXCIV";
let total = romanToInt(s);
console.log(total);
