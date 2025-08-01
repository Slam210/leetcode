/**
 * @param {string} s
 * @return {string}
 */
var robotWithString = function (s) {
  const n = s.length;
  const minRight = new Array(n);
  minRight[n - 1] = s[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    minRight[i] = s[i] < minRight[i + 1] ? s[i] : minRight[i + 1];
  }

  const stack = [];
  let result = "";
  let i = 0;

  while (i < n) {
    stack.push(s[i]);

    while (
      stack.length > 0 &&
      (i === n - 1 || stack[stack.length - 1] <= minRight[i + 1])
    ) {
      result += stack.pop();
    }
    i++;
  }

  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
};

console.log(robotWithString("zza"));
